import { CreatePlayerInput, Player } from '../../models/player';

export interface PlayerRepository {
  create(input: CreatePlayerInput): Promise<Player>;
  list(): Promise<Player[]>;
  exists(id: number): Promise<boolean>;
}
