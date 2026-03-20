import { z } from 'zod';

const categories = ['primera', 'segunda', 'tercera', 'cuarta', 'quinta', 'sexta', 'septima'] as const;
const positions = ['drive', 'reves', 'ambos'] as const;

export const createTournamentSchema = z.object({
  name: z.string().min(2),
  date: z.string().datetime(),
  categories: z.array(z.enum(categories)).min(1)
});

export const createPlayerSchema = z.object({
  name: z.string().min(2),
  lastName: z.string().min(2),
  dni: z.string().min(6),
  phone: z.string().min(8),
  email: z.string().email(),
  position: z.enum(positions),
  category: z.enum(categories)
});

export const createRegistrationSchema = z.object({
  playerId: z.number().int().positive(),
  tournamentId: z.number().int().positive(),
  points: z.number().int().min(0)
});
