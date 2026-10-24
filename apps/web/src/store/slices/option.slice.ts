import { DEFAULT_QORI } from "@/lib/utils/qori-options";
import type { OptionSliceProps } from "@/interfaces";
import type { StateCreator } from "zustand";

const optionSlice: StateCreator<OptionSliceProps, [], [], OptionSliceProps> = (
  set,
) => ({
  audio: false,
  isMore: false,
  terjemahan: false,
  notification: false,
  qori: DEFAULT_QORI,
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
