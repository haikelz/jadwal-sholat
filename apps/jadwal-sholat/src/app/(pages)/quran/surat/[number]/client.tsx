"use client";

import { Languages, MessageSquare, Volume2 } from "lucide-react";
import { useAudioPlayer } from "react-use-audio-player";
import { P, match } from "ts-pattern";
import DetailSurat from "~components/detail-surat";
import ErrorWhileFetch from "~components/error-while-fetch";
import IsRefetching from "~components/is-refetching";
import LoadingClient from "~components/loading-client";
import PreviousOrNext from "~components/previous-or-next";
import { env } from "~env.mjs";
import { useFetch } from "~hooks";
import { cn } from "~lib/utils/cn";
import { bitter } from "~lib/utils/fonts";
import useGlobalStore from "~store";

const { NEXT_PUBLIC_QURAN_API } = env;

export const qoriOptions: Array<{ id: number; name: string }> = [
  {
    id: 1,
    name: "Abdul Basit Murattal",
  },
  {
    id: 2,
    name: "Abdul Basit Mujawwad",
  },
  {
    id: 3,
    name: "Abdullah Basfar",
  },
  {
    id: 4,
    name: "Abdurrahmaan As-Sudais",
  },
  {
    id: 5,
    name: "Abu Bakr Ash-Shaatri",
  },
  {
    id: 6,
    name: "Ahmed ibn Ali al-Ajamy",
  },
  {
    id: 7,
    name: "Mishari Rashid Al-Afasy",
  },
  {
    id: 8,
    name: "Saad Al-Ghamidi",
  },
  {
    id: 9,
    name: "Hani Ar-Rifai",
  },
  {
    id: 10,
    name: "Mahmoud Khalil Al-Hussary",
  },
  {
    id: 11,
    name: "Mahmoud Khalil Al-Hussary Mujawwad",
  },
  {
    id: 12,
    name: "Al Hudhaify",
  },
  {
    id: 13,
    name: "Ibrahim Akhdar",
  },
  {
    id: 14,
    name: "Maher Al Muaiqly",
  },
  {
    id: 15,
    name: "Menshawi",
  },
  {
    id: 16,
    name: "Minshawy Mujawwad",
  },
  {
    id: 17,
    name: "Mohammad al Tablaway",
  },
  {
    id: 18,
    name: "Muhammad Ayyoub",
  },
  {
    id: 19,
    name: "Muhammad Jibreel",
  },
  {
    id: 20,
    name: "Saood bin Ibraaheem Ash-Shuraym",
  },
];

export default function Client({ number }: { number: string }) {
  const {
    audio,
    terjemahan,
    setAudio,
    setTerjemahan,
    tafsir,
    setTafsir,
    qori,
    setQori,
  } = useGlobalStore((state) => ({
    audio: state.audio,
    terjemahan: state.terjemahan,
    setAudio: state.setAudio,
    setTerjemahan: state.setTerjemahan,
    tafsir: state.tafsir,
    setTafsir: state.setTafsir,
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
    match({ number: number })
      .with(
        { number: P.when((number) => number) },
        () => `${NEXT_PUBLIC_QURAN_API}/quran/${number}?imamId=${qori}`
      )
      .otherwise(() => "")
  );

  if ((!data && isError) || isPending) return <LoadingClient />;
  if (isError || typeof data.data === "undefined") return <ErrorWhileFetch />;
  if (isRefetching) return <IsRefetching />;

  const surat = data.data;

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1
            className={cn(
              "text-3xl font-bold tracking-wide sm:text-4xl",
              bitter.className
            )}
          >
            {surat.asma.id.short}
          </h1>
          <p className="font-semibold m-1 tracking-wide">
            {surat.asma.translation.id}. Surat ke-{surat.number}.{" "}
            {surat.type.id}
          </p>
        </div>
        <div className="mt-1 mb-2 flex space-x-4 flex-wrap justify-center items-center">
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
          <button
            type="button"
            aria-label="show tafsir"
            className="flex items-center space-x-1"
            onClick={() => setTafsir(!tafsir)}
          >
            <MessageSquare size={20} />
            <p className="text-lg font-bold">Tafsir</p>
          </button>
          <select
            defaultValue="Pilih Qori'"
            className={cn(
              "bg-gray-50 w-32 px-2.5 select-qori border border-input font-medium rounded-lg",
              "block",
              "dark:bg-gray-950 dark:border-gray-600",
              "dark:text-white"
            )}
            onChange={(e) => setQori(Number(e.target.value))}
          >
            <option className="font-medium">Pilih Qori&#39;</option>
            {qoriOptions.map((item) => (
              <option className="font-medium" key={item.id} value={item.id}>
                {item.id}. {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="my-7 w-full">
        <PreviousOrNext num={Number(number)} />
        <DetailSurat data={surat} />
        <PreviousOrNext num={Number(number)} />
      </div>
    </>
  );
}
