import { useAtom } from "jotai";
import dynamic from "next/dynamic";
import { NextRouter, useRouter } from "next/router";
import { MdInsertComment, MdOutlineTranslate, MdVolumeUp } from "react-icons/md";
import ErrorWhenFetch from "~molecules/ErrorWhenFetch";
import Loading from "~molecules/Loading";
import { useFetch } from "~hooks/useFetch";
import { QURAN_API } from "~lib/utils/constants";
import PreviousOrNextButton from "~molecules/PreviousOrNextButton";
import DetailSurah from "~organisms/DetailSurah";
import { audioAtom, notificationAtom, tafsirAtom, terjemahanAtom } from "~store";
import Layout from "~templates/Layout";

const ModalTafsir = dynamic(() => import("~molecules/ModalTafsir"));
const ModalNotification = dynamic(() => import("~molecules/ModalNotification"));

const Surah = () => {
  const [audio, setAudio] = useAtom(audioAtom);
  const [terjemahan, setTerjemahan] = useAtom(terjemahanAtom);
  const [tafsir, setTafsir] = useAtom(tafsirAtom);
  const [notification, setNotification] = useAtom(notificationAtom);

  const router: NextRouter = useRouter();
  const { number } = router.query;

  const { data, isLoading, isError } = useFetch(
    number ? `${QURAN_API}/quran/${number}?imamId=7` : ""
  );

  if (isLoading) return <Loading />;
  if (isError) return <ErrorWhenFetch />;

  const surat = data.data;

  return (
    <Layout title={surat.asma.id.short}>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1>{surat.asma.id.short}</h1>
          <p className="font-medium tracking-wider">
            {surat.asma.translation.id}. Surat ke-{surat.number}. {surat.type.id}
          </p>
        </div>
        <div className="mt-1 flex space-x-4">
          <button className="flex items-center space-x-1" onClick={() => setAudio(!audio)}>
            <MdVolumeUp size="20px" />
            <p className="text-lg font-bold">Audio</p>
          </button>
          <button
            className="flex items-center space-x-1"
            onClick={() => setTerjemahan(!terjemahan)}
          >
            <MdOutlineTranslate size="20px" />
            <p className="text-lg font-bold">Latin</p>
          </button>
          <button className="flex items-center space-x-1" onClick={() => setTafsir(!tafsir)}>
            <MdInsertComment size="20px" />
            <p className="text-lg font-bold">Tafsir</p>
          </button>
        </div>
        <ModalTafsir surat={surat} />
      </div>
      <PreviousOrNextButton surat={surat} />
      <DetailSurah surat={surat} />
      <PreviousOrNextButton surat={surat} />
      <ModalNotification description="Sudah Ditandai!" />
    </Layout>
  );
};

export default Surah;
