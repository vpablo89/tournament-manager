'use client';

import { PlayerForm } from '../components/PlayerForm';
import { RankingTable } from '../components/RankingTable';
import { RegistrationForm } from '../components/RegistrationForm';
import { StandingsTable } from '../components/StandingsTable';
import { TournamentForm } from '../components/TournamentForm';
import { useTournamentManager } from '../hooks/useTournamentManager';

export default function HomePage() {
  const {
    tournaments,
    players,
    selectedTournamentId,
    selectedTournament,
    standings,
    ranking,
    loading,
    error,
    setSelectedTournamentId,
    refresh
  } = useTournamentManager();

  return (
    <main>
      <h1>Padel Tournament Manager</h1>

      {loading && <p>Loading...</p>}
      {error && <p role="alert">{error}</p>}

      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <TournamentForm onCreated={refresh} />
        <PlayerForm onCreated={refresh} />
        <RegistrationForm players={players} tournaments={tournaments} onCreated={refresh} />
      </div>

      <section style={{ marginTop: '16px' }}>
        <label htmlFor="tournament-select">Select tournament for standings: </label>
        <select
          id="tournament-select"
          value={selectedTournamentId ?? ''}
          onChange={(e) => setSelectedTournamentId(Number(e.target.value))}
        >
          <option value="">Select tournament</option>
          {tournaments.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </section>

      <div style={{ display: 'grid', gap: '12px', marginTop: '16px', gridTemplateColumns: '1fr 1fr' }}>
        <StandingsTable standings={standings} tournamentName={selectedTournament?.name} />
        <RankingTable ranking={ranking} />
      </div>
    </main>
  );
}
