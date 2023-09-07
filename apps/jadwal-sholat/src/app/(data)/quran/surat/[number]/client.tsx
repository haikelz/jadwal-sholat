"use client";

import { cx } from "classix";
import dynamic from "next/dynamic";
import { MdInsertComment, MdOutlineTranslate, MdVolumeUp } from "react-icons/md";
import { useAudioPlayer } from "react-use-audio-player";
import { ErrorWhileFetch, LoadingClient, PreviousOrNext } from "~components/molecules";
import { DetailSurat } from "~components/organisms";
import { env } from "~env.mjs";
import { useFetch } from "~hooks";
import { bitter } from "~lib/utils/fonts";
import { qoriOptions } from "~lib/utils/qori-options";
import useGlobalStore from "~store";

const ModalTafsir = dynamic(() =>
  import("~components/molecules/modal-tafsir").then((obj) => obj.ModalTafsir)
);
const ModalNotification = dynamic(() =>
  import("~components/molecules/modal-notification").then((obj) => obj.ModalNotification)
);

const { NEXT_PUBLIC_QURAN_API } = env;

export default function Client({ number }: { number: string }) {
  const { audio, terjemahan, setAudio, setTerjemahan, tafsir, setTafsir, qori, setQori } =
    useGlobalStore((state) => ({
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

  const { data, isLoading, isError } = useFetch(
    number ? `${NEXT_PUBLIC_QURAN_API}/quran/${number}?imamId=${qori}` : ""
  );

  if ((!data && isError) || isLoading) return <LoadingClient />;
  if (isError || typeof data.data === "undefined") return <ErrorWhileFetch />;

  const surat = data.data;

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className={cx("text-3xl font-bold tracking-wide sm:text-4xl", bitter.className)}>
            {surat.asma.id.short}
          </h1>
          <p className="font-semibold m-1 tracking-wide">
            {surat.asma.translation.id}. Surat ke-{surat.number}. {surat.type.id}
          </p>
        </div>
        <div className="mt-1 mb-2 flex space-x-4 flex-wrap justify-center items-center">
          <button
            type="button"
            aria-label="show audio"
            className="flex items-center space-x-1"
            onClick={handleShowAudio}
          >
            <MdVolumeUp size={20} />
            <p className="text-lg font-bold">Audio</p>
          </button>
          <button
            type="button"
            aria-label="show terjemahan"
            className="flex items-center space-x-1"
            onClick={() => setTerjemahan(!terjemahan)}
          >
            <MdOutlineTranslate size={20} />
            <p className="text-lg font-bold">Latin</p>
          </button>
          <button
            type="button"
            aria-label="show tafsir"
            className="flex items-center space-x-1"
            onClick={() => setTafsir(!tafsir)}
          >
            <MdInsertComment size={20} />
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
        <ModalTafsir surat={surat} />
      </div>
      <PreviousOrNext surat={surat} />
      <DetailSurat surat={surat} />
      <PreviousOrNext surat={surat} />
      <ModalNotification description="Sudah Ditandai!" />
    </>
  );
}
