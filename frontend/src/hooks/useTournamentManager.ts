import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import { Player, RankingRow, StandingRow, Tournament } from '../types';

export function useTournamentManager() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedTournamentId, setSelectedTournamentId] = useState<number | null>(null);
  const [standings, setStandings] = useState<StandingRow[]>([]);
  const [ranking, setRanking] = useState<RankingRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [tournamentsData, playersData, rankingData] = await Promise.all([
        api.getTournaments(),
        api.getPlayers(),
        api.getRanking()
      ]);
      setTournaments(tournamentsData);
      setPlayers(playersData);
      setRanking(rankingData);
      if (tournamentsData.length > 0) {
        setSelectedTournamentId((current) => current ?? tournamentsData[0].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadInitialData();
  }, [loadInitialData]);

  const loadStandings = useCallback(async (tournamentId: number) => {
    setError(null);
    try {
      const data = await api.getStandings(tournamentId);
      setStandings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading standings');
    }
  }, []);

  useEffect(() => {
    if (selectedTournamentId) {
      void loadStandings(selectedTournamentId);
    }
  }, [selectedTournamentId, loadStandings]);

  const refresh = useCallback(async () => {
    await loadInitialData();
    if (selectedTournamentId) {
      await loadStandings(selectedTournamentId);
    }
  }, [loadInitialData, loadStandings, selectedTournamentId]);

  const selectedTournament = useMemo(
    () => tournaments.find((t) => t.id === selectedTournamentId) ?? null,
    [selectedTournamentId, tournaments]
  );

  return {
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
  };
}
