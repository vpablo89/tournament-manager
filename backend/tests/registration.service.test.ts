import { AppError } from '../src/middlewares/errorHandler';
import { PlayerServiceImpl } from '../src/services/playerService';
import { RegistrationServiceImpl } from '../src/services/registrationService';
import { TournamentServiceImpl } from '../src/services/tournamentService';
import {
  InMemoryPlayerRepository,
  InMemoryRegistrationRepository,
  InMemoryTournamentRepository
} from './helpers/inMemoryRepos';

describe('RegistrationService', () => {
  it('throws when tournament does not exist', async () => {
    const tournamentRepo = new InMemoryTournamentRepository();
    const playerRepo = new InMemoryPlayerRepository();
    const registrationRepo = new InMemoryRegistrationRepository(playerRepo);

    const playerService = new PlayerServiceImpl(playerRepo, registrationRepo);
    const registrationService = new RegistrationServiceImpl(registrationRepo, playerRepo, tournamentRepo);

    const player = await playerService.create({ name: 'Player A' });

    await expect(
      registrationService.create({ playerId: player.id, tournamentId: 999, points: 10 })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('calculates ranking from registrations', async () => {
    const tournamentRepo = new InMemoryTournamentRepository();
    const playerRepo = new InMemoryPlayerRepository();
    const registrationRepo = new InMemoryRegistrationRepository(playerRepo);

    const tournamentService = new TournamentServiceImpl(tournamentRepo);
    const playerService = new PlayerServiceImpl(playerRepo, registrationRepo);
    const registrationService = new RegistrationServiceImpl(registrationRepo, playerRepo, tournamentRepo);

    const tournament = await tournamentService.create({
      name: 'Summer Cup',
      date: '2026-07-01T10:00:00.000Z'
    });
    const p1 = await playerService.create({ name: 'Ana' });
    const p2 = await playerService.create({ name: 'Beto' });

    await registrationService.create({ playerId: p1.id, tournamentId: tournament.id, points: 30 });
    await registrationService.create({ playerId: p2.id, tournamentId: tournament.id, points: 10 });

    const ranking = await playerService.ranking();
    expect(ranking[0]).toMatchObject({ playerName: 'Ana', totalPoints: 30 });
    expect(ranking[1]).toMatchObject({ playerName: 'Beto', totalPoints: 10 });
  });
});
