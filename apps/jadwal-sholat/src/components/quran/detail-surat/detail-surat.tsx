"use client";

import { Button } from "@/components/ui/button";
import { usePlayNextAudio, useScrollAyat } from "@/hooks";
import { SuratProps } from "@/interfaces";
import { cn } from "@/lib/utils/cn";
import useGlobalStore from "@/store";
import {
  Bookmark,
  BookmarkCheck,
  ClipboardCheck,
  ClipboardCopy,
  Pause,
  Play,
} from "lucide-react";
import { nanoid } from "nanoid";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { useClipboard } from "use-clipboard-copy";

const DialogNotification = dynamic(() =>
  import("@/components/common/dialog-notification").then(
    (mod) => mod.DialogNotification,
  ),
);

export function DetailSurat({ data }: SuratProps) {
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
    [clipboard, setAyatClick],
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
    isPlaying,
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
      <div className="my-6 flex w-full min-w-0 flex-col sm:my-8">
        {data.ayahs.map((ayat, index) => (
          <article
            className={cn(
              "flex min-w-0 flex-col border-b py-7 sm:py-9",
              "text-foreground",
            )}
            key={index + 1}
          >
            <div className="grid w-full min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5">
              <div
                id={`ayat-${ayat.number.insurah}`}
                className={cn(
                  "flex size-11 items-center justify-center rounded-xl border bg-card",
                  "font-bold tabular-nums shadow-xs sm:size-12",
                  isPlaying && audioList[audioIndex] === ayat.audio.url
                    ? "border-primary bg-primary text-primary-foreground"
                    : "",
                )}
              >
                <span>{ayat.number.insurah}</span>
              </div>
              <p
                lang="ar"
                dir="rtl"
                className={cn(
                  "arabic-font min-w-0 max-w-full text-right text-3xl font-medium leading-loose sm:text-4xl",
                  "[overflow-wrap:anywhere]",
                  isPlaying && audioList[audioIndex] === ayat.audio.url
                    ? "text-muted-foreground"
                    : "",
                )}
              >
                {ayat.text.ar}
              </p>
            </div>
            <div className="mt-5 flex w-full max-w-[72ch] flex-col items-start sm:ml-[4.25rem] sm:w-[calc(100%-4.25rem)]">
              {audio ? (
                <div className="mt-2.5 w-full flex justify-start items-start">
                  <div className="rounded-full">
                    {isPlaying && audioList[audioIndex] === ayat.audio.url ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-full px-4"
                        onClick={handlePauseAudio}
                      >
                        <Pause size={20} />
                        <span className="font-medium">Jeda</span>
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-full px-4"
                        onClick={() =>
                          handlePlayAudio(index, ayat.number.insurah)
                        }
                      >
                        <Play size={20} />
                        <span className="font-medium">Putar</span>
                      </Button>
                    )}
                  </div>
                </div>
              ) : null}
              {terjemahan ? (
                <p className="mt-4 text-left text-base italic leading-relaxed text-muted-foreground">
                  {ayat.text.read}
                </p>
              ) : null}
              <p className="mt-4 text-left text-base leading-7">
                {ayat.translation.id}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-end gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Salin ayat"
                title="Salin ayat"
                onClick={() =>
                  copyToClipboard(
                    data.asma.id.short,
                    ayat.number.insurah,
                    ayat.text.ar,
                    ayat.translation.id,
                  )
                }
              >
                {clipboard.copied && ayat.number.insurah === ayatClick ? (
                  <ClipboardCheck />
                ) : (
                  <ClipboardCopy />
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Tandai ayat terakhir dibaca"
                title="Tandai ayat terakhir dibaca"
                onClick={() =>
                  handleClick(
                    data.asma.id.short,
                    ayat.number.insurah,
                    data.number as number,
                  )
                }
              >
                {lastRead.ayat === ayat.number.insurah ? (
                  <BookmarkCheck />
                ) : (
                  <Bookmark />
                )}
              </Button>
            </div>
          </article>
        ))}
      </div>
      <DialogNotification description="Ayat ditandai sebagai bacaan terakhir." />
    </>
  );
}
