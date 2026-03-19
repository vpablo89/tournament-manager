import { CreateTournamentInput, Tournament } from '../models/tournament';
import { TournamentRepository } from '../repositories/interfaces/tournamentRepository';
import { TournamentService } from './interfaces/tournamentService';

export class TournamentServiceImpl implements TournamentService {
  constructor(private readonly repository: TournamentRepository) {}

  create(input: CreateTournamentInput): Promise<Tournament> {
    return this.repository.create(input);
  }

  list(): Promise<Tournament[]> {
    return this.repository.list();
  }
}
