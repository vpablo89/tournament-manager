import { CreateRegistrationInput, Registration } from '../../models/registration';
import { StandingRow } from '../../repositories/interfaces/registrationRepository';

export interface RegistrationService {
  create(input: CreateRegistrationInput): Promise<Registration>;
  list(): Promise<Registration[]>;
  standings(tournamentId: number): Promise<StandingRow[]>;
}
