"use client";

import { cx } from "classix";
import dynamic from "next/dynamic";
import { MdInsertComment, MdOutlineTranslate, MdVolumeUp } from "react-icons/md";
import { shallow } from "zustand/shallow";
import { PreviousOrNext } from "~components/molecules";
import { DetailSurat } from "~components/organisms";
import { bitter } from "~lib/utils/fonts";
import { BaseSuratProps } from "~models";
import useAppStore from "~store";

const ModalTafsir = dynamic(() =>
  import("~components/molecules/modal-tafsir").then((obj) => obj.ModalTafsir)
);
const ModalNotification = dynamic(() =>
  import("~components/molecules/modal-notification").then((obj) => obj.ModalNotification)
);

export default function Client({ surat }: { surat: BaseSuratProps }) {
  const { audio, terjemahan, setAudio, setTerjemahan, tafsir, setTafsir } = useAppStore(
    (state) => ({
      audio: state.audio,
      terjemahan: state.terjemahan,
      setAudio: state.setAudio,
      setTerjemahan: state.setTerjemahan,
      tafsir: state.tafsir,
      setTafsir: state.setTafsir,
    }),
    shallow
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className={cx("text-3xl font-bold tracking-wide sm:text-4xl", bitter.className)}>
            {surat.asma.id.short}
          </h1>
          <p className="font-medium m-1 tracking-wider">
            {surat.asma.translation.id}. Surat ke-{surat.number}. {surat.type.id}
          </p>
        </div>
        <div className="mt-1 flex space-x-4">
          <button
            type="button"
            aria-label="show audio"
            className="flex items-center space-x-1"
            onClick={() => setAudio(!audio)}
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
        </div>
        {audio ? (
          <audio className="mt-2" id="audio" preload="auto" src={surat.recitation.full} controls>
            <track default kind="captions" />
          </audio>
        ) : null}
        <ModalTafsir surat={surat} />
      </div>
      <PreviousOrNext surat={surat} />
      <DetailSurat surat={surat} />
      <PreviousOrNext surat={surat} />
      <ModalNotification description="Sudah Ditandai!" />
    </>
  );
}
