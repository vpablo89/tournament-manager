import { StandingRow } from '../types';

type Props = {
  tournamentName?: string;
  standings: StandingRow[];
};

export function StandingsTable({ tournamentName, standings }: Props) {
  return (
    <section>
      <h2>Standings {tournamentName ? `- ${tournamentName}` : ''}</h2>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row) => (
            <tr key={`${row.playerId}-${row.points}`}>
              <td>{row.playerName}</td>
              <td>{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
