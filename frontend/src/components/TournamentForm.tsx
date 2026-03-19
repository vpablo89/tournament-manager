import { FormEvent, useState } from 'react';
import { api } from '../services/api';

type Props = {
  onCreated: () => Promise<void>;
};

export function TournamentForm({ onCreated }: Props) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createTournament({
        name,
        date: new Date(date).toISOString()
      });
      setName('');
      setDate('');
      await onCreated();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Create Tournament</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tournament name"
        required
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button disabled={submitting} type="submit">
        {submitting ? 'Saving...' : 'Create'}
      </button>
    </form>
  );
}
