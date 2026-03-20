import { Request, Response } from 'express';
import { PlayerService } from '../services/interfaces/playerService';
import { createPlayerSchema } from '../utils/schemas';

export class PlayerController {
  constructor(private readonly service: PlayerService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const input = createPlayerSchema.parse(req.body);
    const created = await this.service.create(input);
    res.status(201).json(created);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const input = createPlayerSchema.parse(req.body);
    const updated = await this.service.update(id, input);
    res.json(updated);
  };

  list = async (_req: Request, res: Response): Promise<void> => {
    const players = await this.service.list();
    res.json(players);
  };

  ranking = async (_req: Request, res: Response): Promise<void> => {
    const ranking = await this.service.ranking();
    res.json(ranking);
  };
}
