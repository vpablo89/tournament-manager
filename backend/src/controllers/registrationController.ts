import { Request, Response } from 'express';
import { RegistrationService } from '../services/interfaces/registrationService';
import { createRegistrationSchema } from '../utils/schemas';

export class RegistrationController {
  constructor(private readonly service: RegistrationService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const input = createRegistrationSchema.parse(req.body);
    const created = await this.service.create(input);
    res.status(201).json(created);
  };

  list = async (_req: Request, res: Response): Promise<void> => {
    const registrations = await this.service.list();
    res.json(registrations);
  };

  standings = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const standings = await this.service.standings(id);
    res.json(standings);
  };
}
