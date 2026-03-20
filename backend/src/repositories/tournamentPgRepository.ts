import { Pool } from 'pg';
import { CreateTournamentInput, Tournament } from '../models/tournament';
import { TournamentRepository } from './interfaces/tournamentRepository';

export class TournamentPgRepository implements TournamentRepository {
  constructor(private readonly pool: Pool) {}

  async create(input: CreateTournamentInput): Promise<Tournament> {
    const result = await this.pool.query<Tournament>(
      `INSERT INTO tournaments(name, date, categories)
       VALUES ($1, $2, $3)
       RETURNING id, name, date, categories`,
      [input.name, input.date, input.categories]
    );
    return result.rows[0];
  }

  async list(): Promise<Tournament[]> {
    const result = await this.pool.query<Tournament>(
      'SELECT id, name, date, categories FROM tournaments ORDER BY date DESC'
    );
    return result.rows;
  }

  async exists(id: number): Promise<boolean> {
    // `rowCount` can be `null` depending on pg query type; use `rows.length` for safety.
    const result = await this.pool.query('SELECT 1 FROM tournaments WHERE id = $1 LIMIT 1', [id]);
    return result.rows.length > 0;
  }
}
