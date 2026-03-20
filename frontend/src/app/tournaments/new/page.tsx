'use client';

import { TournamentForm } from '../../../components/TournamentForm';
import { useRouter } from 'next/navigation';

export default function NewTournamentPage() {
  const router = useRouter();
  return (
    <section className="panel">
      <TournamentForm
        onCreated={async () => {
          router.push('/tournaments');
        }}
      />
    </section>
  );
}
