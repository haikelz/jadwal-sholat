import { OptionSliceProps } from "@/interfaces";
import { StateCreator } from "zustand";

const optionSlice: StateCreator<OptionSliceProps, [], [], OptionSliceProps> = (
  set
) => ({
  audio: false,
  isMore: false,
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
  setQori: (id) => set({ qori: id }),
});

export default optionSlice;
