"use client";

import { DetailSurat } from "@/components/quran/detail-surat/detail-surat";
import { PreviousOrNext } from "@/components/quran/detail-surat/previous-or-next";
import { ErrorWhileFetch } from "@/components/react-query/error-while-fetch";
import { IsRefetching } from "@/components/react-query/is-refetching";
import { LoadingClient } from "@/components/react-query/loading-client";
import { PageHeader } from "@/components/common/page-shell";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { env } from "@/lib/utils/public-env";
import { useFetch } from "@/hooks";
import { DEFAULT_QORI, qoriOptions } from "@/lib/utils/qori-options";
import { SuratProps } from "@/interfaces";
import useGlobalStore from "@/store";
import { Languages, Volume2 } from "lucide-react";
import dynamic from "next/dynamic";
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

  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      <PageHeader
        title={surat.asma.id.short}
        description={
          <span className="flex flex-wrap items-center gap-x-2">
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
          </span>
        }
      />
      <div
        role="toolbar"
        aria-label="Pengaturan bacaan"
        className="flex flex-wrap items-center gap-2"
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
        <Select
          value={qori.toString()}
          onValueChange={(value) => setQori(Number(value))}
        >
          <SelectTrigger
            aria-label="Pilih qori"
            className="w-full sm:ml-auto sm:w-56"
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
      </div>
      <div className="flex w-full min-w-0 flex-col gap-4">
        <DetailSurat data={surat} />
        <PreviousOrNext num={Number(number)} />
      </div>
    </div>
  );
}
