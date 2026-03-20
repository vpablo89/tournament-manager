export type Tournament = {
  id: number;
  name: string;
  date: string;
  categories: string[];
};

export type Player = {
  id: number;
  name: string;
  lastName: string;
  dni: string;
  phone: string;
  email: string;
  position: 'drive' | 'reves' | 'ambos';
  category: string;
};

export type Registration = {
  id: number;
  playerId: number;
  tournamentId: number;
  points: number;
};

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
