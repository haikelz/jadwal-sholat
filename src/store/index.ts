import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface LastReadProps {
  id: string;
  name: string;
  ayat: number | null;
  number: number | null;
}

interface AppStoreProps {
  audio: boolean;
  tafsir: boolean;
  terjemahan: boolean;
  notification: boolean;
  isMore: boolean;
  date: Date;
  lastRead: LastReadProps;
  setDate: (func: Function) => void;
  setNotification: (status: boolean) => void;
  setAudio: (status: boolean) => void;
  setTerjemahan: (status: boolean) => void;
  setLastRead: (lastRead: LastReadProps) => void;
  setTafsir: (status: boolean) => void;
}

const useAppStore = create<AppStoreProps>()(
  devtools((set) => ({
    audio: false,
    isMore: false,
    tafsir: false,
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
  }))
);

export default useAppStore;
