import { CreateRegistrationInput, Registration } from '../../models/registration';

export type StandingRow = {
  playerId: number;
  playerName: string;
  points: number;
};

export type RankingRow = {
  playerId: number;
  playerName: string;
  totalPoints: number;
};

export interface RegistrationRepository {
  create(input: CreateRegistrationInput): Promise<Registration>;
  list(): Promise<Registration[]>;
  getStandingsByTournament(tournamentId: number): Promise<StandingRow[]>;
  getGlobalRanking(): Promise<RankingRow[]>;
}
