export type Player = {
  id: number;
  name: string;
  lastName: string;
  dni: string;
  phone: string;
  email: string;
  position: 'drive' | 'reves' | 'ambos';
  category: string;
};

export type CreatePlayerInput = {
  name: string;
  lastName: string;
  dni: string;
  phone: string;
  email: string;
  position: 'drive' | 'reves' | 'ambos';
  category: string;
};
