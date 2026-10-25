import { DialogNotification } from "@/components/common/dialog-notification";
import { ShareButton } from "@/components/common/share-button";
import { Button } from "@/components/ui/button";
import { usePlayNextAudio, useScrollAyat } from "@/hooks";
import type { SuratProps } from "@/interfaces";
import { cn } from "@/lib/utils/cn";
import useGlobalStore from "@/store";
import {
  Bookmark,
  BookmarkCheck,
  ClipboardCheck,
  ClipboardCopy,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Square,
} from "lucide-react";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useState } from "react";
import { useClipboard } from "use-clipboard-copy";

export function DetailSurat({ data }: SuratProps) {
  const [ayatClick, setAyatClick] = useState<number>(0);
  // The audio bar stays open while paused, until the reader stops it.
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

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
    setIsPlayerOpen(true);
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

  function handleStopAudio() {
    handlePauseAudio();
    setIsPlayerOpen(false);
  }

  // audioIndex is zero-based; ayah numbers start at 1.
  const playAt = (index: number) => handlePlayAudio(index, index + 1);

  useScrollAyat({ lastRead, ayat, isAudioEnded, setIsAudioEnded });

  // The toolbar's Audio toggle hides the play buttons; it stops the
  // recitation here because this component owns the player (each
  // useAudioPlayer() call is a separate player in react-use-audio-player 4).
  // `pause` is a new function every render but always drives the same
  // player, so it stays out of the deps and the effect runs per toggle.
  useEffect(() => {
    if (audio) return;
    setIsPlayAudio(false);
    pause();
    setIsPlayerOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio]);

  // Autoplay carries on into the next surah; open the bar there too.
  useEffect(() => {
    if (isPlaying) setIsPlayerOpen(true);
  }, [isPlaying]);

  return (
    <>
      <div className="flex w-full min-w-0 flex-col divide-y">
        {data.ayahs.map((ayat, index) => {
          const isCurrent =
            isPlaying && audioList[audioIndex] === ayat.audio.url;

          return (
            <article
              key={index + 1}
              aria-current={isCurrent ? "true" : undefined}
              className={cn(
                "py-6 transition-colors first:pt-0",
                // Soft highlight on the ayah being recited; the negative
                // margin keeps the text where it was.
                isCurrent && "-mx-4 rounded-xl bg-muted/60 px-4 first:pt-6",
              )}
            >
              {/* content-visibility skips laying out ayahs that are off screen
                  (Al-Baqarah has 286). It also clips painting to this box, so
                  -mx-3/px-3 leaves room for the actions' -ml-2.5 and focus rings. */}
              <div className="-mx-3 flex min-w-0 flex-col gap-4 px-3 [contain-intrinsic-size:auto_18rem] [content-visibility:auto]">
                <span
                  id={`ayat-${ayat.number.insurah}`}
                  aria-label={`Ayat ${ayat.number.insurah}`}
                  // Focus target for "Lompat ke ayat".
                  tabIndex={-1}
                  className={cn(
                    // Clear the sticky bars: the app header on phones, the
                    // header plus the reading toolbar from md.
                    "flex size-8 scroll-mt-20 items-center justify-center rounded-full border text-xs font-medium tabular-nums transition-colors md:scroll-mt-40",
                    // An ayah opened from a shared link (#ayat-N) is marked.
                    "target:border-foreground target:ring-2 target:ring-ring/50",
                    isCurrent &&
                      "border-primary bg-primary text-primary-foreground",
                  )}
                >
                  {ayat.number.insurah}
                </span>
                <p
                  lang="ar"
                  dir="rtl"
                  className={cn(
                    "arabic-font min-w-0 text-right font-medium wrap-anywhere [--arabic-leading:2.25] [--arabic-size:1.875rem] sm:[--arabic-size:2.25rem]",
                  )}
                >
                  {ayat.text.ar}
                </p>
                <div className="flex min-w-0 flex-col gap-2">
                  {terjemahan ? (
                    <p className="text-sm leading-[1.75] italic text-muted-foreground">
                      {ayat.text.read}
                    </p>
                  ) : null}
                  <p className="text-sm leading-[1.75]">{ayat.translation.id}</p>
                </div>
                {/* Words beside the icons: not every reader knows them. */}
                <div className="-ml-2.5 flex flex-wrap items-center gap-1">
                  {audio ? (
                    <Button
                      type="button"
                      variant="ghost"
                      aria-label={`${isCurrent ? "Jeda" : "Putar"} ayat ${ayat.number.insurah}`}
                      onClick={() =>
                        isCurrent
                          ? handlePauseAudio()
                          : handlePlayAudio(index, ayat.number.insurah)
                      }
                    >
                      {isCurrent ? (
                        <Pause aria-hidden="true" data-icon="inline-start" />
                      ) : (
                        <Play aria-hidden="true" data-icon="inline-start" />
                      )}
                      {isCurrent ? "Jeda" : "Putar"}
                    </Button>
                  ) : null}
                  <ShareButton
                    variant="ghost"
                    path={`/quran/${data.number}#ayat-${ayat.number.insurah}`}
                    title={`QS. ${data.asma.id.short}: ${ayat.number.insurah}`}
                    excerpt={ayat.translation.id}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    aria-label={`${clipboard.copied && ayat.number.insurah === ayatClick ? "Tersalin" : "Salin"} ayat ${ayat.number.insurah}`}
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
                      <ClipboardCheck aria-hidden="true" data-icon="inline-start" />
                    ) : (
                      <ClipboardCopy aria-hidden="true" data-icon="inline-start" />
                    )}
                    {clipboard.copied && ayat.number.insurah === ayatClick
                      ? "Tersalin"
                      : "Salin"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    aria-label={`${lastRead.ayat === ayat.number.insurah ? "Ditandai" : "Tandai"} ayat ${ayat.number.insurah} sebagai terakhir dibaca`}
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
                      <BookmarkCheck aria-hidden="true" data-icon="inline-start" />
                    ) : (
                      <Bookmark aria-hidden="true" data-icon="inline-start" />
                    )}
                    {lastRead.ayat === ayat.number.insurah ? "Ditandai" : "Tandai"}
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {/* One large control for the whole surah, pinned above the phone tab
          bar while recitation is on. */}
      {isPlayerOpen ? (
        <section
          aria-label="Pemutar audio"
          className="sticky bottom-[calc(3.5rem+env(safe-area-inset-bottom))] z-10 flex flex-wrap items-center justify-between gap-2 border-t bg-background/95 py-3 backdrop-blur md:bottom-0"
        >
          <p className="text-sm font-medium" aria-live="polite">
            {isPlaying ? "Diputar" : "Dijeda"} · Ayat {audioIndex + 1}
          </p>
          <div className="flex flex-wrap items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              disabled={audioIndex === 0}
              onClick={() => playAt(audioIndex - 1)}
            >
              <SkipBack aria-hidden="true" data-icon="inline-start" />
              Mundur
            </Button>
            <Button
              type="button"
              onClick={() =>
                isPlaying ? handlePauseAudio() : playAt(audioIndex)
              }
            >
              {isPlaying ? (
                <Pause aria-hidden="true" data-icon="inline-start" />
              ) : (
                <Play aria-hidden="true" data-icon="inline-start" />
              )}
              {isPlaying ? "Jeda" : "Putar"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              disabled={audioIndex >= audioList.length - 1}
              onClick={() => playAt(audioIndex + 1)}
            >
              <SkipForward aria-hidden="true" data-icon="inline-start" />
              Lanjut
            </Button>
            <Button type="button" variant="ghost" onClick={handleStopAudio}>
              <Square aria-hidden="true" data-icon="inline-start" />
              Berhenti
            </Button>
          </div>
        </section>
      ) : null}
      <DialogNotification description="Ayat ditandai sebagai bacaan terakhir." />
    </>
  );
}
