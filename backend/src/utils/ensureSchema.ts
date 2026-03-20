import { Pool } from 'pg';

export async function ensureSchema(pool: Pool): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tournaments (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      date TIMESTAMP NOT NULL,
      categories TEXT[] NOT NULL DEFAULT ARRAY['primera','segunda','tercera','cuarta','quinta','sexta','septima']::text[]
    );
  `);
  await pool.query(`
    ALTER TABLE tournaments
    ADD COLUMN IF NOT EXISTS categories TEXT[] NOT NULL DEFAULT ARRAY['primera','segunda','tercera','cuarta','quinta','sexta','septima']::text[];
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS players (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      last_name TEXT NOT NULL DEFAULT '',
      dni TEXT NOT NULL DEFAULT '',
      phone TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL DEFAULT '',
      position TEXT NOT NULL DEFAULT 'ambos',
      category TEXT NOT NULL DEFAULT 'septima'
    );
  `);
  await pool.query(`ALTER TABLE players ADD COLUMN IF NOT EXISTS last_name TEXT NOT NULL DEFAULT '';`);
  await pool.query(`ALTER TABLE players ADD COLUMN IF NOT EXISTS dni TEXT NOT NULL DEFAULT '';`);
  await pool.query(`ALTER TABLE players ADD COLUMN IF NOT EXISTS phone TEXT NOT NULL DEFAULT '';`);
  await pool.query(`ALTER TABLE players ADD COLUMN IF NOT EXISTS email TEXT NOT NULL DEFAULT '';`);
  await pool.query(`ALTER TABLE players ADD COLUMN IF NOT EXISTS position TEXT NOT NULL DEFAULT 'ambos';`);
  await pool.query(`ALTER TABLE players ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'septima';`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS registrations (
      id SERIAL PRIMARY KEY,
      player_id INTEGER NOT NULL REFERENCES players(id) ON DELETE CASCADE,
      tournament_id INTEGER NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
      points INTEGER NOT NULL DEFAULT 0
    );
  `);
}
