export type Tournament = {
  id: number;
  name: string;
  date: string;
  categories: string[];
};

export type CreateTournamentInput = {
  name: string;
  date: string;
  categories: string[];
};
