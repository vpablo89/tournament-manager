'use client';

import { useCallback } from 'react';
import { RankingTable } from '../../../components/RankingTable';
import { ResourceState } from '../../../components/ResourceState';
import { useAsyncResource } from '../../../hooks/useAsyncResource';
import { api } from '../../../services/api';

export default function RankingPage() {
  const fetchRanking = useCallback(() => api.getRanking(), []);
  const { data: ranking, loading, error } = useAsyncResource(fetchRanking, []);

  return (
    <section className="panel">
      <ResourceState
        loading={loading}
        error={error}
        empty={ranking.length === 0}
        emptyMessage="No ranking data yet."
      />
      {!loading && !error && ranking.length > 0 && <RankingTable ranking={ranking} />}
    </section>
  );
}
