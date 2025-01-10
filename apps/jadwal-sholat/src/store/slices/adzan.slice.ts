import { AdzanSliceProps } from "@/interfaces";
import { StateCreator } from "zustand";

const adzanSlice: StateCreator<AdzanSliceProps, [], [], AdzanSliceProps> = (
  set
) => ({
  isOpenConfirmModal: false,
  setIsOpenConfirmModal: (isOpenConfirmModal: boolean) =>
    set({ isOpenConfirmModal: isOpenConfirmModal }),
  isPlayingAudioAdzan: false,
  setIsPlayingAudioAdzan: (isPlayingAudioAdzan: boolean) =>
    set({ isPlayingAudioAdzan: isPlayingAudioAdzan }),
});

export default adzanSlice;
