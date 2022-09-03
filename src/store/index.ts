import { atom } from "jotai";

export const audioAtom = atom<boolean>(false);
export const terjemahanAtom = atom<boolean>(false);
export const tafsirAtom = atom<boolean>(false);
export const mountedAtom = atom<boolean>(false);
export const dateAtom = atom<Date>(new Date());
export const isActiveAtom = atom<boolean>(false);
export const scrollAtom = atom<number>(0); 