"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { AudioLoadOptions, useAudioPlayer } from "react-use-audio-player";
import useDeepCompareEffect from "use-deep-compare-effect";

interface UsePlayNextAudioProps {
  audioIndex: number;
  setAudioIndex: Dispatch<SetStateAction<number>>;
  isPlayAudio: boolean;
  setIsPlayAudio: Dispatch<SetStateAction<boolean>>;
  isAudioEnded: boolean;
  setIsAudioEnded: Dispatch<SetStateAction<boolean>>;
  pause: () => void;
  play: () => void;
  playing: boolean;
  ayat: string;
  load: (src: string, options?: AudioLoadOptions | undefined) => void;
  setAyat: Dispatch<SetStateAction<string>>;
}

/**
 * A custom hook for manage autoplay to next audio feature
 * @param {string[]} audioList - audiolist
 */
export function usePlayNextAudio(audioList: string[]): UsePlayNextAudioProps {
  const [ayat, setAyat] = useState<string>("ayat-1");
  const [audioIndex, setAudioIndex] = useState<number>(0);
  const [isPlayAudio, setIsPlayAudio] = useState<boolean>(false);
  const [isAudioEnded, setIsAudioEnded] = useState<boolean>(false);

  const { pause, play, load, playing } = useAudioPlayer();

  useDeepCompareEffect(() => {
    isPlayAudio
      ? load(audioList[audioIndex], {
          autoplay: true,
          onend: () => {
            if (audioIndex < audioList.length - 1) {
              setAudioIndex((index) => {
                if (index === audioList.length - 1) return 0;
                return index + 1;
              });
              setAyat(`ayat-${audioIndex + 2}`);
            }

            setIsAudioEnded(true);
          },
        })
      : null;
  }, [load, audioIndex, setAudioIndex, isPlayAudio, setIsAudioEnded, setAyat, audioList]);

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
