import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TournamentForm } from '../src/components/TournamentForm';
import { api } from '../src/services/api';

jest.mock('../src/services/api', () => ({
  api: {
    createTournament: jest.fn()
  }
}));

describe('TournamentForm', () => {
  it('submits tournament data', async () => {
    const onCreated = jest.fn().mockResolvedValue(undefined);
    (api.createTournament as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'Open',
      date: '2026-01-01T10:00:00.000Z'
    });

    render(<TournamentForm onCreated={onCreated} />);

    fireEvent.change(screen.getByPlaceholderText('Tournament name'), {
      target: { value: 'Open' }
    });
    fireEvent.change(screen.getByDisplayValue(''), {
      target: { value: '2026-01-01T10:00' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));

    await waitFor(() => {
      expect(api.createTournament).toHaveBeenCalledTimes(1);
    });
    expect(onCreated).toHaveBeenCalled();
  });
});
