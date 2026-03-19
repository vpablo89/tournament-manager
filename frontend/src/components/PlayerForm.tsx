import { FormEvent, useState } from 'react';
import { api } from '../services/api';

type Props = {
  onCreated: () => Promise<void>;
};

export function PlayerForm({ onCreated }: Props) {
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.createPlayer({ name });
      setName('');
      await onCreated();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Create Player</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Player name"
        required
      />
      <button disabled={submitting} type="submit">
        {submitting ? 'Saving...' : 'Create'}
      </button>
    </form>
  );
}
