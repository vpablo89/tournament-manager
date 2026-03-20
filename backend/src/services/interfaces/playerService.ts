import { CreatePlayerInput, Player } from '../../models/player';
import { RankingRow } from '../../repositories/interfaces/registrationRepository';

export interface PlayerService {
  create(input: CreatePlayerInput): Promise<Player>;
  update(id: number, input: CreatePlayerInput): Promise<Player>;
  list(): Promise<Player[]>;
  ranking(): Promise<RankingRow[]>;
}
