import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { MdInsertComment, MdOutlineTranslate, MdVolumeUp } from "react-icons/md";
import { shallow } from "zustand/shallow";
import Layout from "~components/Layout";
import { PreviousOrNextButton } from "~components/molecules";
import { DetailSurat } from "~components/organisms";
import { env } from "~env.mjs";
import { useFetch } from "~hooks";
import useAppStore from "~store";

const ModalTafsir = dynamic(() =>
  import("~components/molecules/ModalTafsir").then((obj) => obj.ModalTafsir)
);
const ModalNotification = dynamic(() =>
  import("~components/molecules/ModalNotification").then((obj) => obj.ModalNotification)
);
const Loading = dynamic(() => import("~components/molecules/Loading").then((obj) => obj.Loading));
const ErrorWhileFetch = dynamic(() =>
  import("~components/molecules/ErrorWhileFetch").then((obj) => obj.ErrorWhileFetch)
);

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

  const router = useRouter();
  const { number } = router.query;
  const { NEXT_PUBLIC_QURAN_API } = env;

  const { data, isLoading, isError } = useFetch(
    number ? `${NEXT_PUBLIC_QURAN_API}/quran/${number}?imamId=7` : ""
  );

  if ((!data && !isError) || isLoading) return <Loading />;
  if (isError || typeof data.data === "undefined") return <ErrorWhileFetch />;

  const surat = data.data;

  return (
    <>
      <Layout title={surat.asma.id.short}>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1>{surat.asma.id.short}</h1>
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
