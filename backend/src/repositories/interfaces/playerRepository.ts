import { CreatePlayerInput, Player } from '../../models/player';

export interface PlayerRepository {
  create(input: CreatePlayerInput): Promise<Player>;
  update(id: number, input: CreatePlayerInput): Promise<Player | null>;
  list(): Promise<Player[]>;
  exists(id: number): Promise<boolean>;
}
