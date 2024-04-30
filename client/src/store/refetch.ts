import { atom } from 'jotai';

export const refetchAtom = atom<{ refetchColTable: () => void } | null>(null);
