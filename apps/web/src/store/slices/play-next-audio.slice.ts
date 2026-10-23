import { PlayNextAudioSliceProps } from "@/interfaces";
import { StateCreator } from "zustand";

const playNextAudioSlice: StateCreator<
  PlayNextAudioSliceProps,
  [],
  [],
  PlayNextAudioSliceProps
> = (set) => ({
  ayat: "ayat-1",
  setAyat: (ayat) => set({ ayat: ayat }),
  isAudioEnded: false,
  setIsAudioEnded: (isAudioEnded) => set({ isAudioEnded: isAudioEnded }),
  isPlayAudio: false,
  setIsPlayAudio: (isPlayAudio) => set({ isPlayAudio: isPlayAudio }),
});

export default playNextAudioSlice;
