import { CreateRegistrationInput, Registration } from '../models/registration';
import { AppError } from '../middlewares/errorHandler';
import { PlayerRepository } from '../repositories/interfaces/playerRepository';
import { RegistrationRepository, StandingRow } from '../repositories/interfaces/registrationRepository';
import { TournamentRepository } from '../repositories/interfaces/tournamentRepository';
import { RegistrationService } from './interfaces/registrationService';

export class RegistrationServiceImpl implements RegistrationService {
  constructor(
    private readonly registrationRepository: RegistrationRepository,
    private readonly playerRepository: PlayerRepository,
    private readonly tournamentRepository: TournamentRepository
  ) {}

  async create(input: CreateRegistrationInput): Promise<Registration> {
    const [playerExists, tournamentExists] = await Promise.all([
      this.playerRepository.exists(input.playerId),
      this.tournamentRepository.exists(input.tournamentId)
    ]);

    if (!playerExists) {
      throw new AppError('Player does not exist', 404, 'PLAYER_NOT_FOUND');
    }
    if (!tournamentExists) {
      throw new AppError('Tournament does not exist', 404, 'TOURNAMENT_NOT_FOUND');
    }

    return this.registrationRepository.create(input);
  }

  list(): Promise<Registration[]> {
    return this.registrationRepository.list();
  }

  async standings(tournamentId: number): Promise<StandingRow[]> {
    const exists = await this.tournamentRepository.exists(tournamentId);
    if (!exists) {
      throw new AppError('Tournament does not exist', 404, 'TOURNAMENT_NOT_FOUND');
    }
    return this.registrationRepository.getStandingsByTournament(tournamentId);
  }
}
