"use client";

import { ShareButton } from "@/components/common/share-button";
import { DetailSurat } from "@/components/quran/detail-surat/detail-surat";
import { PreviousOrNext } from "@/components/quran/detail-surat/previous-or-next";
import { ErrorWhileFetch } from "@/components/react-query/error-while-fetch";
import { IsRefetching } from "@/components/react-query/is-refetching";
import { LoadingClient } from "@/components/react-query/loading-client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { env } from "@/lib/utils/public-env";
import { useFetch } from "@/hooks";
import { DEFAULT_QORI, qoriOptions } from "@/lib/utils/qori-options";
import { SuratProps } from "@/interfaces";
import useGlobalStore from "@/store";
import { ChevronLeft, Languages, Volume2 } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FormEvent, useId, useState } from "react";
import { useAudioPlayer } from "react-use-audio-player";

const { NEXT_PUBLIC_QURAN_API } = env;

const DialogTafsir = dynamic(() =>
  import("./dialog-tafsir").then((mod) => mod.DialogTafsir),
);

export function DetailSuratPage({
  number,
  initialData,
}: {
  number: string;
  initialData?: SuratProps;
}) {
  const { audio, terjemahan, setAudio, setTerjemahan, qori, setQori } =
    useGlobalStore((state) => ({
      audio: state.audio,
      terjemahan: state.terjemahan,
      setAudio: state.setAudio,
      setTerjemahan: state.setTerjemahan,
      qori: state.qori,
      setQori: state.setQori,
    }));

  const { stop } = useAudioPlayer();
  const jumpId = useId();
  const [jumpTo, setJumpTo] = useState("");

  function handleShowAudio() {
    setAudio(!audio);
    // stop sound(if it's still playing)
    stop();
  }

  const { data, isPending, isError, isRefetching } = useFetch(
    number ? `${NEXT_PUBLIC_QURAN_API}/quran/${number}?imamId=${qori}` : "",
    // The server rendered the default reciter; other reciters fetch here.
    qori === DEFAULT_QORI ? initialData : undefined,
  );

  if ((!data && isError) || isPending) return <LoadingClient />;
  if (isError || typeof data.data === "undefined") return <ErrorWhileFetch />;
  if (isRefetching) return <IsRefetching />;

  const surat = data.data;

  function handleJump(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ayat = Number(jumpTo);
    if (!Number.isInteger(ayat) || ayat < 1 || ayat > surat.ayahCount) return;
    const target = document.getElementById(`ayat-${ayat}`);
    // Default (instant) scrolling: AGENTS.md rules out smooth scrolling.
    target?.scrollIntoView({ block: "start" });
    target?.focus({ preventScroll: true });
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      {/* Mobile has the app bar's back button; desktop gets this link. */}
      <Link
        href="/quran"
        className="hidden items-center gap-1 self-start rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:inline-flex"
      >
        <ChevronLeft aria-hidden="true" className="size-4" />
        Daftar surat
      </Link>
      {/* Centered, mushaf-style surah header. */}
      <header className="flex flex-col items-center gap-1 text-center">
        <p
          lang="ar"
          dir="rtl"
          className="arabic-font [--arabic-size:2.25rem] md:[--arabic-size:3rem]"
        >
          {surat.asma.ar.short}
        </p>
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          {surat.asma.id.short}
        </h1>
        <p
          data-cy="description"
          className="flex flex-wrap items-center justify-center gap-x-2 text-sm text-muted-foreground"
        >
          <span>{surat.asma.translation.id}</span>
          <span
            aria-hidden
            className="size-1 shrink-0 rounded-full bg-muted-foreground/40"
          />
          <span>{surat.type.id}</span>
          <span
            aria-hidden
            className="size-1 shrink-0 rounded-full bg-muted-foreground/40"
          />
          <span className="tabular-nums">{surat.ayahCount} ayat</span>
        </p>
        <div className="pt-2">
          <ShareButton
            path={`/quran/${surat.number}`}
            title={`QS. ${surat.asma.id.short}`}
            excerpt={`${surat.asma.translation.id} · ${surat.ayahCount} ayat`}
          />
        </div>
      </header>
      {/* Sticky under the app header (h-14 on mobile, h-16 from md) so the
          controls stay reachable in long surahs. */}
      <section
        aria-label="Pengaturan bacaan"
        className="sticky top-14 z-10 flex flex-wrap items-center gap-2 border-b bg-background/95 py-3 backdrop-blur md:top-16"
      >
        <Toggle
          variant="outline"
          pressed={audio}
          onPressedChange={handleShowAudio}
        >
          <Volume2 aria-hidden="true" data-icon="inline-start" />
          Audio
        </Toggle>
        <Toggle
          variant="outline"
          pressed={terjemahan}
          onPressedChange={(pressed) => setTerjemahan(pressed)}
        >
          <Languages aria-hidden="true" data-icon="inline-start" />
          Latin
        </Toggle>
        <DialogTafsir data={surat} />
        <div className="flex w-full min-w-0 items-center gap-2 sm:ml-auto sm:w-auto">
          <Select
            value={qori.toString()}
            onValueChange={(value) => setQori(Number(value))}
          >
            <SelectTrigger
              aria-label="Pilih qori"
              className="min-w-0 flex-1 sm:w-48 sm:flex-none"
            >
              <SelectValue placeholder="Pilih qori" />
            </SelectTrigger>
            <SelectContent>
              {qoriOptions.map((item) => (
                <SelectItem key={item.id} value={item.id.toString()}>
                  {item.id}. {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <form
            onSubmit={handleJump}
            className="flex shrink-0 items-center gap-1"
          >
            <label htmlFor={jumpId} className="sr-only">
              Lompat ke ayat
            </label>
            <Input
              id={jumpId}
              type="number"
              inputMode="numeric"
              min={1}
              max={surat.ayahCount}
              placeholder="Ayat"
              value={jumpTo}
              onChange={(event) => setJumpTo(event.target.value)}
              className="w-20"
            />
            <Button type="submit" variant="outline">
              Buka
            </Button>
          </form>
        </div>
      </section>
      <div className="flex w-full min-w-0 flex-col gap-4">
        <DetailSurat data={surat} />
        <PreviousOrNext num={Number(number)} />
      </div>
    </div>
  );
}
