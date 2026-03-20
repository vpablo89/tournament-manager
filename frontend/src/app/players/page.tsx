'use client';

import { Fragment, useCallback, useState } from 'react';
import { ResourceState } from '../../components/ResourceState';
import { useAsyncResource } from '../../hooks/useAsyncResource';
import { api } from '../../services/api';
import { PADEL_CATEGORIES, PLAYER_POSITIONS } from '../../constants/padel';
import { Player } from '../../types';

type EditState = Omit<Player, 'id'>;

export default function PlayersPage() {
  const fetchPlayers = useCallback(() => api.getPlayers(), []);
  const { data: items, loading, error, reload } = useAsyncResource(fetchPlayers, []);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editState, setEditState] = useState<EditState | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const formatDni = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  };

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    return `${digits.slice(0, 2)} ${digits.slice(2, 6)}-${digits.slice(6)}`;
  };

  const startEdit = (player: Player) => {
    setEditingId(player.id);
    setEditState({
      name: player.name,
      lastName: player.lastName,
      dni: formatDni(player.dni),
      phone: formatPhone(player.phone),
      email: player.email,
      position: player.position,
      category: player.category
    });
    setSaveError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditState(null);
    setSaveError(null);
  };

  const saveEdit = async (id: number) => {
    if (!editState) return;
    setSaving(true);
    setSaveError(null);
    setToast(null);
    try {
      await api.updatePlayer(id, {
        ...editState,
        dni: editState.dni.replace(/\D/g, ''),
        phone: editState.phone.replace(/\D/g, '')
      });
      await reload();
      cancelEdit();
      setToast({ type: 'success', message: 'Player updated successfully.' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not update player';
      setSaveError(message);
      setToast({ type: 'error', message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="panel">
      <h2>Players</h2>
      {toast && <p className={toast.type === 'success' ? 'toast-success' : 'toast-error'}>{toast.message}</p>}
      <ResourceState
        loading={loading}
        error={error}
        empty={items.length === 0}
        emptyMessage="No players yet."
      />
      {!loading && !error && items.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>DNI</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Position</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <Fragment key={item.id}>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name} {item.lastName}</td>
                  <td>{item.dni}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.position}</td>
                  <td>{item.category}</td>
                  <td>
                    <button type="button" onClick={() => startEdit(item)}>
                      Edit
                    </button>
                  </td>
                </tr>
                {editingId === item.id && editState && (
                  <tr>
                    <td colSpan={9}>
                      <div className="form-grid-2">
                        <div>
                          <label>Name</label>
                          <input
                            value={editState.name}
                            onChange={(e) => setEditState({ ...editState, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label>Last name</label>
                          <input
                            value={editState.lastName}
                            onChange={(e) => setEditState({ ...editState, lastName: e.target.value })}
                          />
                        </div>
                        <div>
                          <label>DNI</label>
                          <input
                            value={editState.dni}
                            onChange={(e) => setEditState({ ...editState, dni: formatDni(e.target.value) })}
                          />
                        </div>
                        <div>
                          <label>Phone</label>
                          <input
                            value={editState.phone}
                            onChange={(e) => setEditState({ ...editState, phone: formatPhone(e.target.value) })}
                          />
                        </div>
                        <div>
                          <label>Email</label>
                          <input
                            value={editState.email}
                            onChange={(e) => setEditState({ ...editState, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <label>Position</label>
                          <select
                            value={editState.position}
                            onChange={(e) =>
                              setEditState({
                                ...editState,
                                position: e.target.value as (typeof PLAYER_POSITIONS)[number]
                              })
                            }
                          >
                            {PLAYER_POSITIONS.map((position) => (
                              <option key={position} value={position}>
                                {position}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label>Category</label>
                          <select
                            value={editState.category}
                            onChange={(e) => setEditState({ ...editState, category: e.target.value })}
                          >
                            {PADEL_CATEGORIES.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {saveError && <p className="field-error">{saveError}</p>}
                      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                        <button type="button" onClick={() => saveEdit(item.id)} disabled={saving}>
                          {saving ? 'Saving...' : 'Save'}
                        </button>
                        <button type="button" onClick={cancelEdit} disabled={saving}>
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
