import { StateCreator } from "zustand";
import { OptionSliceProps } from "~models";

const optionSlice: StateCreator<OptionSliceProps, [], [], OptionSliceProps> = (set) => ({
  audio: false,
  isMore: false,
  tafsir: false,
  terjemahan: false,
  notification: false,
  setNotification: (status) => set({ notification: status }),
  setAudio: (status) =>
    set({
      audio: status,
    }),
  setTerjemahan: (status) =>
    set(() => ({
      terjemahan: status,
    })),
  setTafsir: (status) => set({ tafsir: status }),
});

export default optionSlice;
