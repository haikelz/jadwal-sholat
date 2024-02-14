"use client";

import {
  Bookmark,
  BookmarkCheck,
  ClipboardCheck,
  ClipboardCopy,
  Pause,
  Play,
} from "lucide-react";
import { nanoid } from "nanoid";
import { memo, useCallback, useState } from "react";
import { useClipboard } from "use-clipboard-copy";
import { ModalNotification, ModalTafsir } from "~components/molecules";
import { usePlayNextAudio, useScrollAyat } from "~hooks";
import { SuratProps } from "~interfaces";
import { cx } from "~lib/helpers";
import { arab } from "~lib/utils/fonts";
import useGlobalStore from "~store";

export function DetailSurat({ data }: SuratProps) {
  const clipboard = useClipboard({ copiedTimeout: 1000 });
  const [ayatClick, setAyatClick] = useState<number>(0);

  const copyToClipboard = useCallback(
    (surat: string, ayat: number, arab: string, arti: string) => {
      setAyatClick(ayat);

      clipboard.copy(`
      Surat: ${surat}
      Ayat: Ke-${ayat}
      Arab: ${arab}
      Arti: ${arti}
      `);
    },
    [clipboard, setAyatClick]
  );

  const { lastRead, setLastRead, setNotification, terjemahan, audio } =
    useGlobalStore((state) => ({
      lastRead: state.lastRead,
      setLastRead: state.setLastRead,
      setNotification: state.setNotification,
      terjemahan: state.terjemahan,
      audio: state.audio,
    }));

  const audioList: string[] = data.ayahs.map((item) => item.audio.url);

  const {
    audioIndex,
    setAudioIndex,
    setIsPlayAudio,
    isAudioEnded,
    setIsAudioEnded,
    pause,
    play,
    playing,
    ayat,
    setAyat,
  } = usePlayNextAudio(audioList);

  function saveData<T>(newData: T) {
    localStorage.setItem("surat", JSON.stringify(newData));
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

  function handlePlayAudio(index: number, ayat: number) {
    setAudioIndex(() => {
      if (index > audioList.length - 1) return 0;
      return index;
    });

    setIsPlayAudio(true);
    setAyat(`ayat-${ayat}`);

    play();
  }

  function handlePauseAudio() {
    setIsPlayAudio(false);
    pause();
  }

  useScrollAyat({ lastRead, ayat, isAudioEnded, setIsAudioEnded });

  return (
    <>
      <div className="w-full flex flex-col space-y-7 my-7 text-end">
        {data.ayahs.map((ayat, index) => (
          <div
            className={cx(
              "flex flex-col items-end justify-end",
              "border-b-2 border-gray-300 py-4 ",
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
                        <Pause size={20} />
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
                        onClick={() =>
                          handlePlayAudio(index, ayat.number.insurah)
                        }
                      >
                        <Play size={20} />
                        <span className="font-medium">Play</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
              {terjemahan ? (
                <p className="mt-2 text-left italic font-medium text-teal-700 dark:text-teal-300">
                  {ayat.text.read}
                </p>
              ) : null}
              <p className="mt-6 text-left font-medium leading-relaxed tracking-wide">
                {ayat.translation.id}
              </p>
            </div>
            <div className="flex justify-center items-center space-x-3">
              <button
                type="button"
                aria-label="copy"
                title="Copy"
                onClick={() =>
                  copyToClipboard(
                    data.asma.id.short,
                    ayat.number.insurah,
                    ayat.text.ar,
                    ayat.translation.id
                  )
                }
              >
                {clipboard.copied && ayat.number.insurah === ayatClick ? (
                  <ClipboardCheck />
                ) : (
                  <ClipboardCopy />
                )}
              </button>
              <button
                type="button"
                aria-label="tandai ayat"
                title="Bookmark"
                onClick={() =>
                  handleClick(
                    data.asma.id.short,
                    ayat.number.insurah,
                    data.number as number
                  )
                }
              >
                {JSON.parse(localStorage.getItem("surat") || "").ayat ===
                ayat.number.insurah ? (
                  <BookmarkCheck />
                ) : (
                  <Bookmark />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      <ModalTafsir data={data} />
      <ModalNotification description="Sudah Ditandai!" />
    </>
  );
}

memo(DetailSurat);
