export type Registration = {
  id: number;
  playerId: number;
  tournamentId: number;
  points: number;
};

export type CreateRegistrationInput = {
  playerId: number;
  tournamentId: number;
  points: number;
};
