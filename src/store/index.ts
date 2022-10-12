import { atom } from "jotai";

export const audioAtom = atom<boolean>(false);
export const tafsirAtom = atom<boolean>(false);
export const mountedAtom = atom<boolean>(false);
export const isActiveAtom = atom<boolean>(false);
export const terjemahanAtom = atom<boolean>(false);
export const notificationAtom = atom<boolean>(false);
export const locationAtom = atom<{ loaded: boolean; coordinates: { lat: string; long: string } }>({
  loaded: false,
  coordinates: { lat: "", long: " " },
});

export const dateAtom = atom<Date>(new Date());
export const scrollAtom = atom<number>(0);
export const lastReadAtom = atom<any>(null);
