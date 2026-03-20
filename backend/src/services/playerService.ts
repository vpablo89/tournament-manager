import { CreatePlayerInput, Player } from '../models/player';
import { AppError } from '../middlewares/errorHandler';
import { PlayerRepository } from '../repositories/interfaces/playerRepository';
import { RegistrationRepository } from '../repositories/interfaces/registrationRepository';
import { PlayerService } from './interfaces/playerService';

export class PlayerServiceImpl implements PlayerService {
  constructor(
    private readonly playerRepository: PlayerRepository,
    private readonly registrationRepository: RegistrationRepository
  ) {}

  create(input: CreatePlayerInput): Promise<Player> {
    return this.playerRepository.create(input);
  }

  async update(id: number, input: CreatePlayerInput): Promise<Player> {
    const updated = await this.playerRepository.update(id, input);
    if (!updated) {
      throw new AppError('Player does not exist', 404, 'PLAYER_NOT_FOUND');
    }
    return updated;
  }

  list(): Promise<Player[]> {
    return this.playerRepository.list();
  }

  ranking() {
    return this.registrationRepository.getGlobalRanking();
  }
}
