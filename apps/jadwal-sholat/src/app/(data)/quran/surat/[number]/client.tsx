"use client";

import { Languages, MessageSquare, Volume2 } from "lucide-react";
import { useAudioPlayer } from "react-use-audio-player";
import { P, match } from "ts-pattern";
import {
  ErrorWhileFetch,
  LoadingClient,
  PreviousOrNext,
} from "~components/molecules";
import { DetailSurat } from "~components/organisms";
import { env } from "~env.mjs";
import { useFetch } from "~hooks";
import { cx } from "~lib/helpers";
import { bitter } from "~lib/utils/fonts";
import { qoriOptions } from "~lib/utils/qori-options";
import useGlobalStore from "~store";

const { NEXT_PUBLIC_QURAN_API } = env;

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

  const surat = data.data;

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1
            className={cx(
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
            className={cx(
              "bg-gray-50 w-34 px-2.5 select-qori border border-gray-300 font-medium rounded-lg",
              "focus:ring-blue-500 focus:border-blue-500 block",
              "dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400",
              "dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        <PreviousOrNext data={surat} />
        <DetailSurat data={surat} />
        <PreviousOrNext data={surat} />
      </div>
      {isRefetching ? <IsRefetching /> : null}
    </>
  );
}

function IsRefetching() {
  return (
    <div
      className={cx(
        "modal-blur fixed inset-0 top-0 z-50",
        "flex min-h-screen w-full items-center justify-center",
        "overflow-x-hidden"
      )}
    >
      <div className="bg-white rounded-lg p-4 font-medium dark:bg-gray-800 dark:text-white">
        <p className="flex justify-center w-full items-center">
          Loading
          <span role="status">
            <svg
              aria-hidden="true"
              className={cx(
                "h-5 w-5 ml-3 animate-spin",
                "fill-blue-600 text-gray-200",
                "dark:text-gray-600"
              )}
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </span>
        </p>
      </div>
    </div>
  );
}
