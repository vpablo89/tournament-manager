'use client';

import { useCallback } from 'react';
import { ResourceState } from '../../../../components/ResourceState';
import { StandingsTable } from '../../../../components/StandingsTable';
import { useAsyncResource } from '../../../../hooks/useAsyncResource';
import { api } from '../../../../services/api';

type Props = {
  params: { id: string };
};

export default function TournamentStandingsPage({ params }: Props) {
  const tournamentId = Number(params.id);
  const fetchStandings = useCallback(() => api.getStandings(tournamentId), [tournamentId]);
  const { data: standings, loading, error } = useAsyncResource(fetchStandings, []);

  return (
    <section className="panel">
      <ResourceState
        loading={loading}
        error={error}
        empty={standings.length === 0}
        emptyMessage="No standings available for this tournament."
      />
      {!loading && !error && standings.length > 0 && (
        <StandingsTable standings={standings} tournamentName={`#${tournamentId}`} />
      )}
    </section>
  );
}
