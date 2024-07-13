"use client";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useDeepCompareEffect } from "use-deep-compare";
import useGlobalStore from "~store";

export function useAdzan() {
  const { position, date, setIsOpenConfirmModal, setIsPlayingAudioAdzan } =
    useGlobalStore((state) => ({
      position: state.position,
      date: state.date,
      setDate: state.setDate,
      isOpenConfirmModal: state.isOpenConfirmModal,
      setIsOpenConfirmModal: state.setIsOpenConfirmModal,
      isPlayingAudioAdzan: state.isPlayingAudioAdzan,
      setIsPlayingAudioAdzan: state.setIsPlayingAudioAdzan,
    }));

  const { load } = useGlobalAudioPlayer();

  const formattedTime: string = format(date, `kk.mm`, {
    locale: id,
  });

  useDeepCompareEffect(() => {
    if (formattedTime === "") {
      setIsOpenConfirmModal(true);
      load("/audio/adzan-shubuh.mp3", {
        onend: () => setIsPlayingAudioAdzan(false),
      });
    } else {
      setIsOpenConfirmModal(true);
      load("/audio/adzan.mp3", {
        onend: () => setIsPlayingAudioAdzan(false),
      });
    }
  }, [formattedTime, setIsOpenConfirmModal, load, setIsPlayingAudioAdzan]);
}
