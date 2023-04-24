import dynamic from "next/dynamic";
import { NextRouter, useRouter } from "next/router";
import { MdInsertComment, MdOutlineTranslate, MdVolumeUp } from "react-icons/md";
import { shallow } from "zustand/shallow";
import { useFetch } from "~hooks";
import { QURAN_API } from "~lib/utils/constants";
import PreviousOrNextButton from "~molecules/PreviousOrNextButton";
import DetailSurat from "~organisms/DetailSurat";
import useAppStore from "~store";
import Layout from "~templates/Layout";

const ModalTafsir = dynamic(() => import("~molecules/ModalTafsir"));
const ModalNotification = dynamic(() => import("~molecules/ModalNotification"));
const Loading = dynamic(() => import("~molecules/Loading"));
const ErrorWhenFetch = dynamic(() => import("~molecules/ErrorWhenFetch"));

export default function Surat() {
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

  const router: NextRouter = useRouter();
  const { number } = router.query;

  const { data, isLoading, isError } = useFetch(
    number ? `${QURAN_API}/quran/${number}?imamId=7` : ""
  );

  if ((!data && !isError) || isLoading) return <Loading />;
  if (isError || typeof data.data === "undefined") return <ErrorWhenFetch />;

  const surat = data.data;

  return (
    <>
      <Layout title={surat.asma.id.short}>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1>{surat.asma.id.short}</h1>
            <p className="font-medium tracking-wider">
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
              <MdVolumeUp size="20px" />
              <p className="text-lg font-bold">Audio</p>
            </button>
            <button
              type="button"
              aria-label="show terjemahan"
              className="flex items-center space-x-1"
              onClick={() => setTerjemahan(!terjemahan)}
            >
              <MdOutlineTranslate size="20px" />
              <p className="text-lg font-bold">Latin</p>
            </button>
            <button
              type="button"
              aria-label="show tafsir"
              className="flex items-center space-x-1"
              onClick={() => setTafsir(!tafsir)}
            >
              <MdInsertComment size="20px" />
              <p className="text-lg font-bold">Tafsir</p>
            </button>
          </div>
          <ModalTafsir surat={surat} />
        </div>
        <PreviousOrNextButton surat={surat} />
        <DetailSurat surat={surat} />
        <PreviousOrNextButton surat={surat} />
      </Layout>
      <ModalNotification description="Sudah Ditandai!" />
    </>
  );
}
