export default function HomePage() {
  return (
    <section className="panel">
      <h1>Padel Tournament Manager</h1>
      <p>
        Minimal UI, separated flows, and backend-driven ranking/standings.
      </p>
      <div className="grid grid-3">
        <a className="panel" href="/tournaments/new">Create tournament</a>
        <a className="panel" href="/players/new">Create player</a>
        <a className="panel" href="/registrations/new">Register player</a>
        <a className="panel" href="/tournaments">View tournaments</a>
        <a className="panel" href="/players">View players</a>
        <a className="panel" href="/registrations">View registrations</a>
        <a className="panel" href="/players/ranking">Global ranking</a>
        <a className="panel" href="/docs">Swagger docs</a>
      </div>
    </section>
  );
}
