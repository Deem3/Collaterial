import { atom } from 'jotai';

export const userAtom = atom<USER | null>(null);

export interface USER {
  username: string;
  sub: {
    id: string;
    role: string;
    createdAt: Date;
  };
}
