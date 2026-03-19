import { Pool } from 'pg';
import { CreatePlayerInput, Player } from '../models/player';
import { PlayerRepository } from './interfaces/playerRepository';

export class PlayerPgRepository implements PlayerRepository {
  constructor(private readonly pool: Pool) {}

  async create(input: CreatePlayerInput): Promise<Player> {
    const result = await this.pool.query<Player>(
      'INSERT INTO players(name) VALUES ($1) RETURNING id, name',
      [input.name]
    );
    return result.rows[0];
  }

  async list(): Promise<Player[]> {
    const result = await this.pool.query<Player>('SELECT id, name FROM players ORDER BY name ASC');
    return result.rows;
  }

  async exists(id: number): Promise<boolean> {
    const result = await this.pool.query('SELECT 1 FROM players WHERE id = $1 LIMIT 1', [id]);
    return result.rowCount > 0;
  }
}
