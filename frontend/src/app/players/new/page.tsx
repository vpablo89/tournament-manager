'use client';

import { useRouter } from 'next/navigation';
import { PlayerForm } from '../../../components/PlayerForm';

export default function NewPlayerPage() {
  const router = useRouter();
  return (
    <section className="panel">
      <PlayerForm
        onCreated={async () => {
          router.push('/players');
        }}
      />
    </section>
  );
}
