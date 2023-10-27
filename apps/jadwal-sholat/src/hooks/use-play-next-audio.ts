"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { AudioLoadOptions, useAudioPlayer } from "react-use-audio-player";
import { useDeepCompareEffect } from "use-deep-compare";
import { PlayNextAudioSliceProps } from "~interfaces";
import useGlobalStore from "~store";

interface UsePlayNextAudioProps extends PlayNextAudioSliceProps {
  audioIndex: number;
  setAudioIndex: Dispatch<SetStateAction<number>>;
  pause: () => void;
  play: () => void;
  playing: boolean;
  load: (src: string, options?: AudioLoadOptions | undefined) => void;
}

/**
 * A custom hook for manage autoplay to next audio feature
 * @param {string[]} audioList - audiolist
 */
export function usePlayNextAudio(audioList: string[]): UsePlayNextAudioProps {
  const [audioIndex, setAudioIndex] = useState<number>(0);

  const {
    ayat,
    setAyat,
    isPlayAudio,
    setIsPlayAudio,
    isAudioEnded,
    setIsAudioEnded,
  } = useGlobalStore((state) => ({
    ayat: state.ayat,
    setAyat: state.setAyat,
    isPlayAudio: state.isPlayAudio,
    setIsPlayAudio: state.setIsPlayAudio,
    isAudioEnded: state.isAudioEnded,
    setIsAudioEnded: state.setIsAudioEnded,
  }));

  const { pause, play, load, playing } = useAudioPlayer();

  useDeepCompareEffect(() => {
    isPlayAudio
      ? load(audioList[audioIndex], {
          autoplay: true,
          onend: () => {
            if (audioIndex < audioList.length - 1) {
              setAudioIndex((index: any) => {
                if (index === audioList.length - 1) return 0;
                return index + 1;
              });
              setAyat(`ayat-${audioIndex + 2}`);
            }

            setIsAudioEnded(true);
          },
        })
      : null;
  }, [
    load,
    audioIndex,
    setAudioIndex,
    isPlayAudio,
    setIsAudioEnded,
    setAyat,
    audioList,
  ]);

  return {
    audioIndex,
    setAudioIndex,
    isPlayAudio,
    setIsPlayAudio,
    isAudioEnded,
    setIsAudioEnded,
    pause,
    play,
    load,
    playing,
    ayat,
    setAyat,
  };
}
