import { Request, Response } from 'express';
import { TournamentService } from '../services/interfaces/tournamentService';
import { createTournamentSchema } from '../utils/schemas';

export class TournamentController {
  constructor(private readonly service: TournamentService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const input = createTournamentSchema.parse(req.body);
    const created = await this.service.create(input);
    res.status(201).json(created);
  };

  list = async (_req: Request, res: Response): Promise<void> => {
    const tournaments = await this.service.list();
    res.json(tournaments);
  };
}
