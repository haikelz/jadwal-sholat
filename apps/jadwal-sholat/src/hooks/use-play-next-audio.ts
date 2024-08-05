import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { AudioLoadOptions, useAudioPlayer } from "react-use-audio-player";
import { P, match } from "ts-pattern";
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
 *
 * @export
 * @param {string[]} audioList
 * @param {number} num
 * @returns {UsePlayNextAudioProps}
 */
export function usePlayNextAudio(
  audioList: string[],
  num: number
): UsePlayNextAudioProps {
  const router = useRouter();
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
    match({ isPlayAudio: isPlayAudio })
      .with({ isPlayAudio: true }, () =>
        load(audioList[audioIndex], {
          autoplay: true,
          onend: () => {
            match({ audioIndex: audioIndex })
              .with(
                {
                  audioIndex: P.when(
                    (audioIndex) => audioIndex < audioList.length - 1
                  ),
                },
                () => {
                  setAudioIndex((index: number) => {
                    if (index === audioList.length - 1) return 0;
                    return index + 1;
                  });
                  setAyat(`ayat-${audioIndex + 2}`);
                }
              )
              .with(
                {
                  audioIndex: P.when(
                    (audioIndex) => audioIndex + 1 === audioList.length
                  ),
                },
                () => {
                  if (num === 114) return;
                  router.push(`/quran/surat/${num + 1}`);
                }
              );

            setIsAudioEnded(true);
          },
        })
      )
      .otherwise(() => null);
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
