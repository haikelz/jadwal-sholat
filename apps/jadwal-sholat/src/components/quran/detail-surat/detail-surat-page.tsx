"use client";

import { DetailSurat } from "@/components/quran/detail-surat/detail-surat";
import { PreviousOrNext } from "@/components/quran/detail-surat/previous-or-next";
import { ErrorWhileFetch } from "@/components/react-query/error-while-fetch";
import { IsRefetching } from "@/components/react-query/is-refetching";
import { LoadingClient } from "@/components/react-query/loading-client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { env } from "@/env.mjs";
import { useFetch } from "@/hooks";
import { qoriOptions } from "@/lib/utils/qori-options";
import useGlobalStore from "@/store";
import { Languages, Volume2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useAudioPlayer } from "react-use-audio-player";

const { NEXT_PUBLIC_QURAN_API } = env;

const DialogTafsir = dynamic(() =>
  import("./dialog-tafsir").then((mod) => mod.DialogTafsir),
);

export function DetailSuratPage({ number }: { number: string }) {
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
  );

  if ((!data && isError) || isPending) return <LoadingClient />;
  if (isError || typeof data.data === "undefined") return <ErrorWhileFetch />;
  if (isRefetching) return <IsRefetching />;

  const surat = data.data;

  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      <header className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {surat.asma.id.short}
          </h1>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            {surat.asma.translation.id}. Surat ke-{surat.number}.{" "}
            {surat.type.id}
          </p>
        </div>
        <div className="mt-5 flex w-full flex-wrap items-center justify-center gap-2 rounded-xl border bg-card p-3 shadow-xs sm:w-auto">
          <Button
            type="button"
            variant={audio ? "secondary" : "ghost"}
            aria-pressed={audio}
            onClick={handleShowAudio}
          >
            <Volume2 aria-hidden="true" size={18} />
            <span className="font-semibold">Audio</span>
          </Button>
          <Button
            type="button"
            variant={terjemahan ? "secondary" : "ghost"}
            aria-pressed={terjemahan}
            onClick={() => setTerjemahan(!terjemahan)}
          >
            <Languages aria-hidden="true" size={18} />
            <span className="font-semibold">Latin</span>
          </Button>
          <DialogTafsir data={surat} />
          <Select
            value={qori.toString()}
            onValueChange={(value) => setQori(Number(value))}
          >
            <SelectTrigger aria-label="Pilih qori" className="w-full sm:w-56">
              <SelectValue placeholder="Pilih Qori&#39;" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {qoriOptions.map((item) => (
                  <SelectItem
                    className="font-medium"
                    key={item.id}
                    value={item.id.toString()}
                  >
                    {item.id}. {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </header>
      <div className="mx-auto w-full max-w-3xl min-w-0">
        <PreviousOrNext num={Number(number)} />
        <DetailSurat data={surat} />
        <PreviousOrNext num={Number(number)} />
      </div>
    </div>
  );
}
