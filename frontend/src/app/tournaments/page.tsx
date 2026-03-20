'use client';

import Link from 'next/link';
import { useCallback } from 'react';
import { ResourceState } from '../../components/ResourceState';
import { useAsyncResource } from '../../hooks/useAsyncResource';
import { api } from '../../services/api';

export default function TournamentsPage() {
  const fetchTournaments = useCallback(() => api.getTournaments(), []);
  const { data: items, loading, error } = useAsyncResource(fetchTournaments, []);

  return (
    <section className="panel">
      <h2>Tournaments</h2>
      <ResourceState
        loading={loading}
        error={error}
        empty={items.length === 0}
        emptyMessage="No tournaments yet."
      />
      {!loading && !error && items.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Categories</th>
              <th>Standings</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{new Date(item.date).toLocaleString()}</td>
                <td>{item.categories.join(', ')}</td>
                <td>
                  <Link href={`/tournaments/${item.id}/standings`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
