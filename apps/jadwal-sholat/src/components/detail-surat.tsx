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
import { useCallback, useState } from "react";
import { P, match } from "ts-pattern";
import { useClipboard } from "use-clipboard-copy";
import { usePlayNextAudio, useScrollAyat } from "~hooks";
import { SuratProps } from "~interfaces";
import { cn } from "~lib/utils/cn";
import useGlobalStore from "~store";

import ModalNotification from "./modal-notification";
import ModalTafsir from "./modal-tafsir";

export default function DetailSurat({ data }: SuratProps) {
  const [ayatClick, setAyatClick] = useState<number>(0);

  const clipboard = useClipboard({ copiedTimeout: 1000 });

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
  } = usePlayNextAudio(audioList, data.number);

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
      <div className="w-full flex flex-col space-y-7 my-7">
        {data.ayahs.map((ayat, index) => (
          <div
            className={cn(
              "flex flex-col items-end justify-end",
              "border-b border-input py-4 ",
              "dark:text-white"
            )}
            key={index + 1}
          >
            <div className="relative flex w-full items-start justify-between">
              <div
                id={`ayat-${ayat.number.insurah}`}
                className={cn(
                  "mr-2 flex h-8 w-8 border border-input items-center justify-center rounded-md p-5",
                  "bg-gray-50 dark:bg-gray-950 font-bold"
                )}
              >
                <p className="font-bold">{ayat.number.insurah}</p>
              </div>
              <p
                className={cn(
                  "text-right text-3xl tracking-wide font-medium leading-loose",
                  "arabic-font",
                  playing && audioList[audioIndex] === ayat.audio.url
                    ? "text-gray-600 dark:text-gray-400"
                    : ""
                )}
              >
                {ayat.text.ar}
              </p>
            </div>
            <div className="mb-6 flex w-full flex-col items-start justify-start">
              {match({ audio: audio })
                .with({ audio: true }, () => (
                  <div className="mt-2.5 w-full flex justify-start items-start">
                    <div className="rounded-full">
                      {playing && audioList[audioIndex] === ayat.audio.url ? (
                        <button
                          type="button"
                          aria-label="pause audio"
                          className={cn(
                            "flex justify-center items-center bg-gray-50 dark:bg-gray-950 border border-input",
                            "transition-all border border-input px-2.5 py-1",
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
                          className={cn(
                            "flex justify-center items-center bg-gray-50 dark:bg-gray-950",
                            "transition-all border border-input px-2.5 py-1",
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
                ))
                .otherwise(() => null)}
              {match({ terjemahan: terjemahan })
                .with({ terjemahan: true }, () => (
                  <p className="mt-2 text-left italic font-medium text-teal-700 dark:text-teal-300">
                    {ayat.text.read}
                  </p>
                ))
                .otherwise(() => null)}
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
                {match({
                  copied: clipboard.copied,
                  insurah: ayat.number.insurah,
                })
                  .with(
                    {
                      copied: true,
                      insurah: P.when((insurah) => insurah === ayatClick),
                    },
                    () => <ClipboardCheck />
                  )
                  .otherwise(() => (
                    <ClipboardCopy />
                  ))}
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
                {match({ lastReadAyat: lastRead.ayat })
                  .with(
                    {
                      lastReadAyat: P.when(
                        (lastReadAyat) => lastReadAyat === ayat.number.insurah
                      ),
                    },
                    () => <BookmarkCheck />
                  )
                  .otherwise(() => (
                    <Bookmark />
                  ))}
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
