import { CreateTournamentInput, Tournament } from '../../models/tournament';

export interface TournamentService {
  create(input: CreateTournamentInput): Promise<Tournament>;
  list(): Promise<Tournament[]>;
}
