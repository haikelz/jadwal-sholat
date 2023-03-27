import { create } from "zustand";
import { devtools } from "zustand/middleware";

type LastReadProps = {
  id: string;
  name: string;
  ayat: number | null;
  number: number | null;
};

type AppStoreProps = {
  audio: boolean;
  tafsir: boolean;
  terjemahan: boolean;
  notification: boolean;
  isMore: boolean;
  date: Date;
  isAutoPlay: boolean;
  lastRead: LastReadProps;
  setDate: (func: Function) => void;
  setIsAutoPlay: (autoPlayLogic: boolean) => void;
  setNotification: (status: boolean) => void;
  setAudio: (status: boolean) => void;
  setTerjemahan: (status: boolean) => void;
  setLastRead: (lastRead: LastReadProps) => void;
  setTafsir: (status: boolean) => void;
};

const useAppStore = create<AppStoreProps>()(
  devtools((set) => ({
    audio: false,
    isMore: false,
    tafsir: false,
    isAutoPlay: false,
    terjemahan: false,
    notification: false,
    date: new Date(),
    lastRead: { id: "", name: "", ayat: null, number: null },
    setTafsir: (status) => set(() => ({ tafsir: status })),
    setNotification: (status) =>
      set(() => ({
        notification: status,
      })),
    setLastRead: (lastRead: LastReadProps) =>
      set(() => ({
        lastRead: lastRead,
      })),
    setTerjemahan: (status) =>
      set(() => ({
        terjemahan: status,
      })),
    setAudio: (status) =>
      set(() => ({
        audio: status,
      })),
    setDate: (func) =>
      set(() => ({
        date: func(),
      })),
    setIsAutoPlay: (autoPlayLogic) =>
      set(() => ({
        isAutoPlay: autoPlayLogic,
      })),
  }))
);

export default useAppStore;
