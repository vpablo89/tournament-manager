import { render, screen } from '@testing-library/react';
import { RankingTable } from '../src/components/RankingTable';

describe('RankingTable', () => {
  it('renders players and points', () => {
    render(
      <RankingTable
        ranking={[
          { playerId: 1, playerName: 'Ana', totalPoints: 30 },
          { playerId: 2, playerName: 'Beto', totalPoints: 10 }
        ]}
      />
    );

    expect(screen.getByText('Global Ranking')).toBeInTheDocument();
    expect(screen.getByText('Ana')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });
});
