"use client";

import { DetailSurat } from "@/components/quran/detail-surat/detail-surat";
import { PreviousOrNext } from "@/components/quran/detail-surat/previous-or-next";
import { ErrorWhileFetch } from "@/components/react-query/error-while-fetch";
import { IsRefetching } from "@/components/react-query/is-refetching";
import { LoadingClient } from "@/components/react-query/loading-client";
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
import { cn } from "@/lib/utils/cn";
import { qoriOptions } from "@/lib/utils/qori-options";
import useGlobalStore from "@/store";
import { Languages, Volume2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useAudioPlayer } from "react-use-audio-player";

const { NEXT_PUBLIC_QURAN_API } = env;

const DialogTafsir = dynamic(() =>
  import("./dialog-tafsir").then((mod) => mod.DialogTafsir)
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
    number ? `${NEXT_PUBLIC_QURAN_API}/quran/${number}?imamId=${qori}` : ""
  );

  if ((!data && isError) || isPending) return <LoadingClient />;
  if (isError || typeof data.data === "undefined") return <ErrorWhileFetch />;
  if (isRefetching) return <IsRefetching />;

  const surat = data.data;

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className={cn("text-3xl font-bold tracking-wide sm:text-4xl")}>
            {surat.asma.id.short}
          </h1>
          <p className="font-semibold m-1 tracking-wide">
            {surat.asma.translation.id}. Surat ke-{surat.number}.{" "}
            {surat.type.id}
          </p>
        </div>
        <div className="mt-1 mb-2 flex space-x-4 flex-wrap justify-center items-center gap-4">
          <button
            type="button"
            aria-label="show audio"
            className="flex items-center space-x-1"
            onClick={handleShowAudio}
          >
            <Volume2 size={20} />
            <p className="text-lg font-bold">Audio</p>
          </button>
          <button
            type="button"
            aria-label="show terjemahan"
            className="flex items-center space-x-1"
            onClick={() => setTerjemahan(!terjemahan)}
          >
            <Languages size={20} />
            <p className="text-lg font-bold">Latin</p>
          </button>
          <DialogTafsir data={surat} />
          <Select
            defaultValue="Pilih Qori'"
            onValueChange={(value) => setQori(Number(value))}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Pilih Qori&#39;" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem className="font-medium" value="Pilih Qori&#39;">
                  Pilih Qori&#39;
                </SelectItem>
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
      </div>
      <div className="mt-7 w-full">
        <PreviousOrNext num={Number(number)} />
        <DetailSurat data={surat} />
        <PreviousOrNext num={Number(number)} />
      </div>
    </>
  );
}
