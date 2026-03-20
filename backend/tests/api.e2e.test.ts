import request from 'supertest';
import { createApp } from '../src/app/createApp';
import { PlayerController } from '../src/controllers/playerController';
import { RegistrationController } from '../src/controllers/registrationController';
import { TournamentController } from '../src/controllers/tournamentController';
import { PlayerServiceImpl } from '../src/services/playerService';
import { RegistrationServiceImpl } from '../src/services/registrationService';
import { TournamentServiceImpl } from '../src/services/tournamentService';
import {
  InMemoryPlayerRepository,
  InMemoryRegistrationRepository,
  InMemoryTournamentRepository
} from './helpers/inMemoryRepos';

describe('Tournament Manager API', () => {
  const tournamentRepo = new InMemoryTournamentRepository();
  const playerRepo = new InMemoryPlayerRepository();
  const registrationRepo = new InMemoryRegistrationRepository(playerRepo);

  const tournamentService = new TournamentServiceImpl(tournamentRepo);
  const playerService = new PlayerServiceImpl(playerRepo, registrationRepo);
  const registrationService = new RegistrationServiceImpl(registrationRepo, playerRepo, tournamentRepo);

  const app = createApp(
    {
      tournamentController: new TournamentController(tournamentService),
      playerController: new PlayerController(playerService),
      registrationController: new RegistrationController(registrationService)
    },
    'http://localhost:3000'
  );

  it('creates tournament and player, registers and returns rankings', async () => {
    const tournament = await request(app)
      .post('/tournaments')
      .send({
        name: 'Open Madrid',
        date: '2026-06-12T10:00:00.000Z',
        categories: ['primera', 'segunda', 'tercera', 'cuarta', 'quinta', 'sexta', 'septima']
      })
      .expect(201);

    const player = await request(app)
      .post('/players')
      .send({
        name: 'Pablo',
        lastName: 'Vera',
        dni: '12345678',
        phone: '1122334455',
        email: 'pablo@example.com',
        position: 'ambos',
        category: 'segunda'
      })
      .expect(201);

    await request(app)
      .post('/registrations')
      .send({ playerId: player.body.id, tournamentId: tournament.body.id, points: 25 })
      .expect(201);

    const standings = await request(app).get(`/tournaments/${tournament.body.id}/standings`).expect(200);
    expect(standings.body[0]).toMatchObject({ playerName: 'Pablo Vera', points: 25 });

    const ranking = await request(app).get('/players/ranking').expect(200);
    expect(ranking.body[0]).toMatchObject({ playerName: 'Pablo Vera', totalPoints: 25 });
  });

  it('updates player data without changing id', async () => {
    const created = await request(app)
      .post('/players')
      .send({
        name: 'Ana',
        lastName: 'Diaz',
        dni: '22334455',
        phone: '1199991111',
        email: 'ana@example.com',
        position: 'drive',
        category: 'tercera'
      })
      .expect(201);

    const updated = await request(app)
      .put(`/players/${created.body.id}`)
      .send({
        name: 'Ana Maria',
        lastName: 'Diaz',
        dni: '22334455',
        phone: '1199992222',
        email: 'anamaria@example.com',
        position: 'ambos',
        category: 'segunda'
      })
      .expect(200);

    expect(updated.body).toMatchObject({
      id: created.body.id,
      name: 'Ana Maria',
      email: 'anamaria@example.com',
      position: 'ambos',
      category: 'segunda'
    });
  });
});
