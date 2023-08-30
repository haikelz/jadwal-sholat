"use client";

import { cx } from "classix";
import { nanoid } from "nanoid";
import { memo, useEffect, useState } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";
import secureLocalStorage from "react-secure-storage";
import { useAudioPlayer } from "react-use-audio-player";
import { SuratProps } from "~interfaces";
import { arab } from "~lib/utils/fonts";
import useGlobalStore from "~store";

export function DetailSurat({ surat }: SuratProps) {
  const { lastRead, setLastRead, setNotification, terjemahan, audio } = useGlobalStore((state) => ({
    lastRead: state.lastRead,
    setLastRead: state.setLastRead,
    setNotification: state.setNotification,
    terjemahan: state.terjemahan,
    audio: state.audio,
  }));

  const [audioIndex, setAudioIndex] = useState<number>(0);
  const [isPlayAudio, setIsPlayAudio] = useState<boolean>(false);
  const [isAudioEnded, setIsAudioEnded] = useState<boolean>(false);
  const [ayat, setAyat] = useState<string>("ayat-1");

  const { pause, play, load, playing } = useAudioPlayer();

  const audioList: string[] = surat.ayahs.map((item) => item.audio.url);

  function saveData<T>(newData: T) {
    secureLocalStorage.setItem("surat", JSON.stringify(newData));
  }

  function handleClick(name: string, ayat: number, number: number) {
    const data = {
      id: nanoid(),
      name: name,
      ayat: ayat,
      number: number,
    };

    setNotification(true);
    setLastRead(data);
    saveData(data);
  }

  function handlePlayAudio(index: number, ayat: number): void {
    setAudioIndex(() => {
      if (index > audioList.length - 1) return 0;
      return index;
    });

    setIsPlayAudio(true);
    setAyat(`ayat-${ayat}`);

    play();
  }

  function handlePauseAudio(): void {
    setIsPlayAudio(false);
    pause();
  }

  // autoplay to next audio logic
  useEffect(() => {
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
  }, [load, audioIndex, setAudioIndex, isPlayAudio, setIsAudioEnded, setAyat]);

  useEffect(() => {
    const lastReadId = document.getElementById(`ayat-${lastRead.ayat?.toString()}`);
    const ayatId = document.getElementById(ayat);

    if (lastReadId && lastRead.number === Number(secureLocalStorage.getItem("selected-surat"))) {
      lastReadId.scrollIntoView({ behavior: "smooth" });
    }

    if (isAudioEnded) ayatId?.scrollIntoView({ behavior: "smooth" });

    setIsAudioEnded(false);
  }, [lastRead, isAudioEnded, setIsAudioEnded, ayat]);

  return (
    <div className="mt-6 grid w-full grid-cols-1 grid-rows-1 gap-2 text-end">
      {surat.ayahs.map((ayat, index) => (
        <div
          className={cx(
            "mb-4 flex flex-col items-end justify-end",
            "border-b-2 border-gray-300 py-4 text-black",
            "dark:text-white"
          )}
          key={index + 1}
        >
          <div className="relative flex w-full items-start justify-between">
            <div
              id={`ayat-${ayat.number.insurah}`}
              className={cx(
                "mr-2 flex h-12 w-12 items-center justify-center rounded-full p-6",
                "border-black bg-gray-400 font-bold text-white",
                "dark:bg-teal-600"
              )}
            >
              <p className="font-bold">{ayat.number.insurah}</p>
            </div>
            <p
              className={cx(
                "text-right text-4xl font-medium leading-relaxed",
                arab.className,
                playing && audioList[audioIndex] === ayat.audio.url
                  ? "text-teal-700 dark:text-teal-300"
                  : ""
              )}
            >
              {ayat.text.ar}
            </p>
          </div>
          <div className="mb-6 flex w-full flex-col items-start justify-start">
            {audio ? (
              <div className="mt-2.5 w-full flex justify-start items-start">
                <div className="rounded-full">
                  {playing && audioList[audioIndex] === ayat.audio.url ? (
                    <button
                      type="button"
                      aria-label="pause audio"
                      className={cx(
                        "flex justify-center items-center bg-gray-200 dark:bg-gray-800",
                        "transition-all border border-gray-300 dark:border-gray-600 px-2.5 py-1",
                        "rounded-full space-x-2"
                      )}
                      onClick={handlePauseAudio}
                    >
                      <MdPause size={20} />
                      <span className="font-medium">Pause</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      aria-label="play audio"
                      className={cx(
                        "flex justify-center items-center bg-gray-200 dark:bg-gray-800",
                        "transition-all border border-gray-300 dark:border-gray-600 px-2.5 py-1",
                        "rounded-full space-x-2"
                      )}
                      onClick={() => handlePlayAudio(index, ayat.number.insurah)}
                    >
                      <MdPlayArrow size={20} />
                      <span className="font-medium">Play</span>
                    </button>
                  )}
                </div>
              </div>
            ) : null}
            {terjemahan ? (
              <p className="mt-2 text-left italic text-teal-700 dark:text-teal-300">
                {ayat.text.read}
              </p>
            ) : null}
            <p className="mt-6 text-left font-normal leading-relaxed tracking-wide">
              {ayat.translation.id}
            </p>
          </div>
          <button
            type="button"
            aria-label="tandai ayat"
            className={cx(
              "hover-animation underline-animation mt-2 font-semibold",
              "hover:text-teal-700",
              "dark:hover:text-blue-500"
            )}
            onClick={() =>
              handleClick(surat.asma.id.short, ayat.number.insurah, surat.number as number)
            }
          >
            Tandai ayat
          </button>
        </div>
      ))}
    </div>
  );
}

memo(DetailSurat);
