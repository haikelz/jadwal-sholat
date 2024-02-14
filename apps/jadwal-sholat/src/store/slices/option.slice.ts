import { StateCreator } from "zustand";
import { OptionSliceProps } from "~interfaces";

const optionSlice: StateCreator<OptionSliceProps, [], [], OptionSliceProps> = (
  set
) => ({
  audio: false,
  isMore: false,
  tafsir: false,
  terjemahan: false,
  notification: false,
  qori: 7,
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
  setQori: (id) => set({ qori: id }),
});

export default optionSlice;
