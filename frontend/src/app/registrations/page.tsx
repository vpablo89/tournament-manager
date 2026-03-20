'use client';

import { useCallback } from 'react';
import { ResourceState } from '../../components/ResourceState';
import { useAsyncResource } from '../../hooks/useAsyncResource';
import { api } from '../../services/api';

export default function RegistrationsPage() {
  const fetchRegistrations = useCallback(() => api.getRegistrations(), []);
  const { data: items, loading, error } = useAsyncResource(fetchRegistrations, []);

  return (
    <section className="panel">
      <h2>Registrations</h2>
      <ResourceState
        loading={loading}
        error={error}
        empty={items.length === 0}
        emptyMessage="No registrations yet."
      />
      {!loading && !error && items.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Player ID</th>
              <th>Tournament ID</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.playerId}</td>
                <td>{item.tournamentId}</td>
                <td>{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
