import { z } from 'zod';

export const createTournamentSchema = z.object({
  name: z.string().min(2),
  date: z.string().datetime()
});

export const createPlayerSchema = z.object({
  name: z.string().min(2)
});

export const createRegistrationSchema = z.object({
  playerId: z.number().int().positive(),
  tournamentId: z.number().int().positive(),
  points: z.number().int().min(0)
});
