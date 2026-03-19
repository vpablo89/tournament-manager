import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Tournament Manager',
  description: 'Padel tournament manager'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
