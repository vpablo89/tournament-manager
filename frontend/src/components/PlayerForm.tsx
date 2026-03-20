import { FormEvent, useState } from 'react';
import { z } from 'zod';
import { api } from '../services/api';
import { PADEL_CATEGORIES, PLAYER_POSITIONS } from '../constants/padel';

type Props = {
  onCreated: () => Promise<void>;
};

const playerSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  lastName: z.string().min(2, 'Last name must have at least 2 characters'),
  dni: z
    .string()
    .refine((value) => value.replace(/\D/g, '').length >= 7, 'DNI must have at least 7 digits'),
  phone: z
    .string()
    .refine((value) => value.replace(/\D/g, '').length >= 8, 'Phone must have at least 8 digits'),
  email: z.string().email('Email format is invalid'),
  position: z.enum(PLAYER_POSITIONS),
  category: z.enum(PADEL_CATEGORIES)
});

type FormErrors = Partial<Record<'name' | 'lastName' | 'dni' | 'phone' | 'email' | 'position' | 'category', string>>;

function formatDni(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
  return `${digits.slice(0, 2)} ${digits.slice(2, 6)}-${digits.slice(6)}`;
}

export function PlayerForm({ onCreated }: Props) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState<(typeof PLAYER_POSITIONS)[number]>('ambos');
  const [category, setCategory] = useState<(typeof PADEL_CATEGORIES)[number]>('septima');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setErrors({});
    const parsed = playerSchema.safeParse({ name, lastName, dni, phone, email, position, category });
    if (!parsed.success) {
      const nextErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === 'string' && !nextErrors[key as keyof FormErrors]) {
          nextErrors[key as keyof FormErrors] = issue.message;
        }
      }
      setErrors(nextErrors);
      setFormError('Please fix the highlighted fields.');
      return;
    }
    setSubmitting(true);
    try {
      await api.createPlayer({
        name,
        lastName,
        dni: dni.replace(/\D/g, ''),
        phone: phone.replace(/\D/g, ''),
        email,
        position,
        category
      });
      setName('');
      setLastName('');
      setDni('');
      setPhone('');
      setEmail('');
      setPosition('ambos');
      setCategory('septima');
      setFormError(null);
      setErrors({});
      await onCreated();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Could not create player');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Create Player</h2>
      {formError && <p className="form-error">{formError}</p>}
      <div className="form-grid-2">
        <div>
          <label htmlFor="player-name">Player name</label>
          <input
            id="player-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Player name"
          />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="player-last-name">Last name</label>
          <input
            id="player-last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
          />
          {errors.lastName && <p className="field-error">{errors.lastName}</p>}
        </div>
        <div>
          <label htmlFor="player-dni">DNI</label>
          <input
            id="player-dni"
            value={dni}
            onChange={(e) => setDni(formatDni(e.target.value))}
            placeholder="12.345.678"
            inputMode="numeric"
          />
          {errors.dni && <p className="field-error">{errors.dni}</p>}
        </div>
        <div>
          <label htmlFor="player-phone">Phone</label>
          <input
            id="player-phone"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="11 2345-6789"
            inputMode="tel"
          />
          {errors.phone && <p className="field-error">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="player-email">Email</label>
          <input
            id="player-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          {errors.email && <p className="field-error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="player-position">Position</label>
          <select
            id="player-position"
            value={position}
            onChange={(e) => setPosition(e.target.value as (typeof PLAYER_POSITIONS)[number])}
          >
            {PLAYER_POSITIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.position && <p className="field-error">{errors.position}</p>}
        </div>
        <div>
          <label htmlFor="player-category">Category</label>
          <select
            id="player-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as (typeof PADEL_CATEGORIES)[number])}
          >
            {PADEL_CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.category && <p className="field-error">{errors.category}</p>}
        </div>
      </div>
      <button disabled={submitting} type="submit">
        {submitting ? 'Saving...' : 'Create'}
      </button>
    </form>
  );
}
