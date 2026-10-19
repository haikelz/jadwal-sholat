"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
      <div className="flex w-full min-w-0 flex-col divide-y">
        {data.ayahs.map((ayat, index) => {
          const isCurrent =
            isPlaying && audioList[audioIndex] === ayat.audio.url;

          return (
            <article
              key={index + 1}
              className="flex min-w-0 flex-col gap-4 py-6 first:pt-0"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  id={`ayat-${ayat.number.insurah}`}
                  aria-label={`Ayat ${ayat.number.insurah}`}
                  // Focus target for "Lompat ke ayat".
                  tabIndex={-1}
                  className={cn(
                    // Clear the sticky app header and reading toolbar.
                    "flex size-8 scroll-mt-44 items-center justify-center rounded-full border text-xs font-medium tabular-nums transition-colors md:scroll-mt-32",
                    isCurrent &&
                      "border-primary bg-primary text-primary-foreground",
                  )}
                >
                  {ayat.number.insurah}
                </span>
                <div className="flex items-center gap-1">
                  {audio ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={isCurrent ? "Jeda ayat" : "Putar ayat"}
                          onClick={() =>
                            isCurrent
                              ? handlePauseAudio()
                              : handlePlayAudio(index, ayat.number.insurah)
                          }
                        >
                          {isCurrent ? (
                            <Pause aria-hidden="true" />
                          ) : (
                            <Play aria-hidden="true" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {isCurrent ? "Jeda" : "Putar"}
                      </TooltipContent>
                    </Tooltip>
                  ) : null}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Salin ayat"
                        onClick={() =>
                          copyToClipboard(
                            data.asma.id.short,
                            ayat.number.insurah,
                            ayat.text.ar,
                            ayat.translation.id,
                          )
                        }
                      >
                        {clipboard.copied &&
                        ayat.number.insurah === ayatClick ? (
                          <ClipboardCheck aria-hidden="true" />
                        ) : (
                          <ClipboardCopy aria-hidden="true" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Salin ayat</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Tandai ayat terakhir dibaca"
                        aria-pressed={lastRead.ayat === ayat.number.insurah}
                        onClick={() =>
                          handleClick(
                            data.asma.id.short,
                            ayat.number.insurah,
                            data.number as number,
                          )
                        }
                      >
                        {lastRead.ayat === ayat.number.insurah ? (
                          <BookmarkCheck aria-hidden="true" />
                        ) : (
                          <Bookmark aria-hidden="true" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Tandai terakhir dibaca</TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <p
                lang="ar"
                dir="rtl"
                className={cn(
                  "arabic-font min-w-0 text-right text-3xl font-medium wrap-anywhere sm:text-4xl",
                  isCurrent && "text-muted-foreground",
                )}
              >
                {ayat.text.ar}
              </p>
              <div className="flex min-w-0 flex-col gap-1">
                {terjemahan ? (
                  <p className="text-sm italic text-muted-foreground">
                    {ayat.text.read}
                  </p>
                ) : null}
                <p className="text-sm">{ayat.translation.id}</p>
              </div>
            </article>
          );
        })}
      </div>
      <DialogNotification description="Ayat ditandai sebagai bacaan terakhir." />
    </>
  );
}
