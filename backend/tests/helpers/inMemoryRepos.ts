import { CreatePlayerInput, Player } from '../../src/models/player';
import { CreateRegistrationInput, Registration } from '../../src/models/registration';
import { CreateTournamentInput, Tournament } from '../../src/models/tournament';
import { PlayerRepository } from '../../src/repositories/interfaces/playerRepository';
import {
  RankingRow,
  RegistrationRepository,
  StandingRow
} from '../../src/repositories/interfaces/registrationRepository';
import { TournamentRepository } from '../../src/repositories/interfaces/tournamentRepository';

export class InMemoryTournamentRepository implements TournamentRepository {
  private items: Tournament[] = [];
  private id = 1;

  async create(input: CreateTournamentInput): Promise<Tournament> {
    const item = { id: this.id++, ...input };
    this.items.push(item);
    return item;
  }

  async list(): Promise<Tournament[]> {
    return [...this.items];
  }

  async exists(id: number): Promise<boolean> {
    return this.items.some((item) => item.id === id);
  }
}

export class InMemoryPlayerRepository implements PlayerRepository {
  private items: Player[] = [];
  private id = 1;

  async create(input: CreatePlayerInput): Promise<Player> {
    const item = { id: this.id++, ...input };
    this.items.push(item);
    return item;
  }

  async list(): Promise<Player[]> {
    return [...this.items];
  }

  async exists(id: number): Promise<boolean> {
    return this.items.some((item) => item.id === id);
  }
}

export class InMemoryRegistrationRepository implements RegistrationRepository {
  private items: Registration[] = [];
  private id = 1;

  constructor(private readonly players: InMemoryPlayerRepository) {}

  async create(input: CreateRegistrationInput): Promise<Registration> {
    const item = { id: this.id++, ...input };
    this.items.push(item);
    return item;
  }

  async list(): Promise<Registration[]> {
    return [...this.items];
  }

  async getStandingsByTournament(tournamentId: number): Promise<StandingRow[]> {
    const players = await this.players.list();
    return this.items
      .filter((r) => r.tournamentId === tournamentId)
      .map((r) => ({
        playerId: r.playerId,
        playerName: players.find((p) => p.id === r.playerId)?.name ?? 'Unknown',
        points: r.points
      }))
      .sort((a, b) => b.points - a.points || a.playerName.localeCompare(b.playerName));
  }

  async getGlobalRanking(): Promise<RankingRow[]> {
    const players = await this.players.list();
    const map = new Map<number, number>();
    for (const reg of this.items) {
      map.set(reg.playerId, (map.get(reg.playerId) ?? 0) + reg.points);
    }
    return players
      .map((p) => ({
        playerId: p.id,
        playerName: p.name,
        totalPoints: map.get(p.id) ?? 0
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints || a.playerName.localeCompare(b.playerName));
  }
}
