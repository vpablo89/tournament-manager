'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { RegistrationForm } from '../../../components/RegistrationForm';
import { ResourceState } from '../../../components/ResourceState';
import { useAsyncResource } from '../../../hooks/useAsyncResource';
import { api } from '../../../services/api';

export default function NewRegistrationPage() {
  const router = useRouter();
  const fetchFormData = useCallback(
    async () => Promise.all([api.getPlayers(), api.getTournaments()]),
    []
  );
  const { data, loading, error } = useAsyncResource(fetchFormData, [[], []] as const);
  const [players, tournaments] = data;

  return (
    <section className="panel">
      <ResourceState
        loading={loading}
        error={error}
        empty={players.length === 0 || tournaments.length === 0}
        emptyMessage="Create at least one player and one tournament first."
      />
      {!loading && !error && players.length > 0 && tournaments.length > 0 && (
      <RegistrationForm
        players={players}
        tournaments={tournaments}
        onCreated={async () => {
          router.push('/registrations');
        }}
      />
      )}
    </section>
  );
}
