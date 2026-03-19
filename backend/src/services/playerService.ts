import { CreatePlayerInput, Player } from '../models/player';
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

  list(): Promise<Player[]> {
    return this.playerRepository.list();
  }

  ranking() {
    return this.registrationRepository.getGlobalRanking();
  }
}
