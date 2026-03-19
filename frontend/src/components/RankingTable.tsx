import { RankingRow } from '../types';

type Props = {
  ranking: RankingRow[];
};

export function RankingTable({ ranking }: Props) {
  return (
    <section>
      <h2>Global Ranking</h2>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Total points</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((row) => (
            <tr key={row.playerId}>
              <td>{row.playerName}</td>
              <td>{row.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
