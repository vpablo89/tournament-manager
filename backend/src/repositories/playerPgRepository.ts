import { Pool } from 'pg';
import { CreatePlayerInput, Player } from '../models/player';
import { PlayerRepository } from './interfaces/playerRepository';

export class PlayerPgRepository implements PlayerRepository {
  constructor(private readonly pool: Pool) {}

  async create(input: CreatePlayerInput): Promise<Player> {
    const result = await this.pool.query<Player>(
      `INSERT INTO players(name, last_name, dni, phone, email, position, category)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, name, last_name as "lastName", dni, phone, email, position, category`,
      [input.name, input.lastName, input.dni, input.phone, input.email, input.position, input.category]
    );
    return result.rows[0];
  }

  async update(id: number, input: CreatePlayerInput): Promise<Player | null> {
    const result = await this.pool.query<Player>(
      `UPDATE players
       SET name = $2, last_name = $3, dni = $4, phone = $5, email = $6, position = $7, category = $8
       WHERE id = $1
       RETURNING id, name, last_name as "lastName", dni, phone, email, position, category`,
      [id, input.name, input.lastName, input.dni, input.phone, input.email, input.position, input.category]
    );
    return result.rows[0] ?? null;
  }

  async list(): Promise<Player[]> {
    const result = await this.pool.query<Player>(
      `SELECT id, name, last_name as "lastName", dni, phone, email, position, category
       FROM players
       ORDER BY last_name ASC, name ASC`
    );
    return result.rows;
  }

  async exists(id: number): Promise<boolean> {
    // `rowCount` can be `null` depending on pg query type; use `rows.length` for safety.
    const result = await this.pool.query('SELECT 1 FROM players WHERE id = $1 LIMIT 1', [id]);
    return result.rows.length > 0;
  }
}
