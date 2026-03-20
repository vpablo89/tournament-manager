import { Player, RankingRow, Registration, StandingRow, Tournament } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? 'API request failed');
  }

  return res.json();
}

export const api = {
  createTournament: (payload: { name: string; date: string; categories: string[] }) =>
    request<Tournament>('/tournaments', { method: 'POST', body: JSON.stringify(payload) }),
  getTournaments: () => request<Tournament[]>('/tournaments'),
  createPlayer: (payload: {
    name: string;
    lastName: string;
    dni: string;
    phone: string;
    email: string;
    position: 'drive' | 'reves' | 'ambos';
    category: string;
  }) =>
    request<Player>('/players', { method: 'POST', body: JSON.stringify(payload) }),
  updatePlayer: (
    id: number,
    payload: {
      name: string;
      lastName: string;
      dni: string;
      phone: string;
      email: string;
      position: 'drive' | 'reves' | 'ambos';
      category: string;
    }
  ) => request<Player>(`/players/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  getPlayers: () => request<Player[]>('/players'),
  createRegistration: (payload: { playerId: number; tournamentId: number; points: number }) =>
    request<Registration>('/registrations', { method: 'POST', body: JSON.stringify(payload) }),
  getRegistrations: () => request<Registration[]>('/registrations'),
  getStandings: (tournamentId: number) => request<StandingRow[]>(`/tournaments/${tournamentId}/standings`),
  getRanking: () => request<RankingRow[]>('/players/ranking')
};
