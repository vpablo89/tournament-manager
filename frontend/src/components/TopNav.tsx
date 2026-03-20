import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/tournaments/new', label: 'Create Tournament' },
  { href: '/tournaments', label: 'Tournaments' },
  { href: '/players/new', label: 'Create Player' },
  { href: '/players', label: 'Players' },
  { href: '/registrations/new', label: 'Register Player' },
  { href: '/registrations', label: 'Registrations' },
  { href: '/players/ranking', label: 'Ranking' },
  { href: '/docs', label: 'Docs' }
];

export function TopNav() {
  return (
    <header className="top-nav">
      <div className="brand">Padel Tour</div>
      <nav>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="nav-link">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
