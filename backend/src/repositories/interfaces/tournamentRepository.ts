import { CreateTournamentInput, Tournament } from '../../models/tournament';

export interface TournamentRepository {
  create(input: CreateTournamentInput): Promise<Tournament>;
  list(): Promise<Tournament[]>;
  exists(id: number): Promise<boolean>;
}
