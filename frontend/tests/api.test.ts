import { api } from '../src/services/api';

describe('api service', () => {
  it('calls tournaments endpoint', async () => {
    const originalFetch = globalThis.fetch;
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, name: 'Open', date: '2026-01-01T10:00:00.000Z' }]
    } as Response) as unknown as typeof fetch;
    globalThis.fetch = fetchMock;

    const data = await api.getTournaments();
    expect(data).toHaveLength(1);

    globalThis.fetch = originalFetch;
  });
});
