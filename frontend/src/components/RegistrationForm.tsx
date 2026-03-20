import { FormEvent, useState } from 'react';
import { api } from '../services/api';
import { Player, Tournament } from '../types';

type Props = {
  players: Player[];
  tournaments: Tournament[];
  onCreated: () => Promise<void>;
};

export function RegistrationForm({ players, tournaments, onCreated }: Props) {
  const [playerId, setPlayerId] = useState<number | ''>('');
  const [tournamentId, setTournamentId] = useState<number | ''>('');
  const [points, setPoints] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!playerId || !tournamentId) return;
    setSubmitting(true);
    try {
      await api.createRegistration({ playerId, tournamentId, points });
      setPoints(0);
      await onCreated();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Register Player</h2>
      <label htmlFor="registration-player">Player</label>
      <select
        id="registration-player"
        value={playerId}
        onChange={(e) => setPlayerId(Number(e.target.value))}
        required
      >
        <option value="">Select player</option>
        {players.map((player) => (
          <option key={player.id} value={player.id}>
            {player.name}
          </option>
        ))}
      </select>
      <label htmlFor="registration-tournament">Tournament</label>
      <select
        id="registration-tournament"
        value={tournamentId}
        onChange={(e) => setTournamentId(Number(e.target.value))}
        required
      >
        <option value="">Select tournament</option>
        {tournaments.map((tournament) => (
          <option key={tournament.id} value={tournament.id}>
            {tournament.name}
          </option>
        ))}
      </select>
      <label htmlFor="registration-points">Points</label>
      <input
        id="registration-points"
        type="number"
        min={0}
        value={points}
        onChange={(e) => setPoints(Number(e.target.value))}
      />
      <button disabled={submitting} type="submit">
        {submitting ? 'Saving...' : 'Register'}
      </button>
    </form>
  );
}
