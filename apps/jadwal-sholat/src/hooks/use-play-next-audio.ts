"use client";

import { useState } from "react";
import { useAudioPlayer } from "react-use-audio-player";
import useDeepCompareEffect from "use-deep-compare-effect";

/**
 * A custom hook for manage autoplay to next audio
 * @param {string[]} audioList
 */
export function usePlayNextAudio(audioList: string[]) {
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
