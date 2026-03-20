import { Pool } from 'pg';
import { CreateRegistrationInput, Registration } from '../models/registration';
import {
  RankingRow,
  RegistrationRepository,
  StandingRow
} from './interfaces/registrationRepository';

export class RegistrationPgRepository implements RegistrationRepository {
  constructor(private readonly pool: Pool) {}

  async create(input: CreateRegistrationInput): Promise<Registration> {
    const result = await this.pool.query<Registration>(
      `INSERT INTO registrations(player_id, tournament_id, points)
       VALUES ($1, $2, $3)
       RETURNING id, player_id as "playerId", tournament_id as "tournamentId", points`,
      [input.playerId, input.tournamentId, input.points]
    );
    return result.rows[0];
  }

  async list(): Promise<Registration[]> {
    const result = await this.pool.query<Registration>(
      'SELECT id, player_id as "playerId", tournament_id as "tournamentId", points FROM registrations ORDER BY id DESC'
    );
    return result.rows;
  }

  async getStandingsByTournament(tournamentId: number): Promise<StandingRow[]> {
    const result = await this.pool.query<StandingRow>(
      `SELECT p.id as "playerId", CONCAT(p.name, ' ', p.last_name) as "playerName", r.points
       FROM registrations r
       JOIN players p ON p.id = r.player_id
       WHERE r.tournament_id = $1
       ORDER BY r.points DESC, p.last_name ASC, p.name ASC`,
      [tournamentId]
    );
    return result.rows;
  }

  async getGlobalRanking(): Promise<RankingRow[]> {
    const result = await this.pool.query<RankingRow>(
      `SELECT p.id as "playerId", CONCAT(p.name, ' ', p.last_name) as "playerName", COALESCE(SUM(r.points), 0)::int as "totalPoints"
       FROM players p
       LEFT JOIN registrations r ON r.player_id = p.id
       GROUP BY p.id, p.name, p.last_name
       ORDER BY "totalPoints" DESC, p.last_name ASC, p.name ASC`
    );
    return result.rows;
  }
}
