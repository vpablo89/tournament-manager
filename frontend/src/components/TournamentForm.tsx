import { FormEvent, useState } from 'react';
import DatePicker from 'react-datepicker';
import { api } from '../services/api';
import { PADEL_CATEGORIES } from '../constants/padel';

type Props = {
  onCreated: () => Promise<void>;
};

export function TournamentForm({ onCreated }: Props) {
  const [name, setName] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState('10:00');
  const [categories, setCategories] = useState<string[]>([...PADEL_CATEGORIES]);
  const [submitting, setSubmitting] = useState(false);

  const toggleCategory = (category: string) => {
    setCategories((current) =>
      current.includes(category) ? current.filter((item) => item !== category) : [...current, category]
    );
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!date || categories.length === 0) return;
    const [hours, minutes] = time.split(':').map(Number);
    const mergedDate = new Date(date);
    mergedDate.setHours(hours, minutes, 0, 0);
    setSubmitting(true);
    try {
      await api.createTournament({
        name,
        date: mergedDate.toISOString(),
        categories
      });
      setName('');
      setDate(null);
      setTime('10:00');
      setCategories([...PADEL_CATEGORIES]);
      await onCreated();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Create Tournament</h2>
      <label htmlFor="tournament-name">Tournament name</label>
      <input
        id="tournament-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tournament name"
        required
      />
      <label htmlFor="tournament-date">Date and time</label>
      <div className="date-time-row">
        <DatePicker
          id="tournament-date"
          selected={date}
          onChange={(nextDate: Date | null) => setDate(nextDate)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select date"
          required
          className="datepicker-input"
          calendarClassName="datepicker-calendar"
          dayClassName={() => 'datepicker-day'}
        />
        <select id="tournament-time" value={time} onChange={(e) => setTime(e.target.value)} aria-label="Time">
          {Array.from({ length: 24 * 2 }).map((_, idx) => {
            const hours = String(Math.floor(idx / 2)).padStart(2, '0');
            const minutes = idx % 2 === 0 ? '00' : '30';
            const value = `${hours}:${minutes}`;
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
      <fieldset>
        <legend>Categories (default: all)</legend>
        {PADEL_CATEGORIES.map((category) => (
          <label key={category} style={{ display: 'inline-flex', gap: 6, marginRight: 10 }}>
            <input
              type="checkbox"
              checked={categories.includes(category)}
              onChange={() => toggleCategory(category)}
            />
            {category}
          </label>
        ))}
      </fieldset>
      <button disabled={submitting} type="submit">
        {submitting ? 'Saving...' : 'Create'}
      </button>
    </form>
  );
}
