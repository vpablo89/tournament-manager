import './globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import { ReactNode } from 'react';
import { TopNav } from '../components/TopNav';

export const metadata = {
  title: 'Tournament Manager',
  description: 'Padel tournament manager'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        <main className="app-container">{children}</main>
      </body>
    </html>
  );
}
