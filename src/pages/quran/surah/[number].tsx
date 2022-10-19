import { MdInsertComment, MdOutlineTranslate, MdVolumeUp } from "react-icons/md";
import { useFetch } from "@/src/hooks/useFetch";
import { audioAtom, notificationAtom, tafsirAtom, terjemahanAtom } from "@/src/store";
import { QURAN_API } from "@/src/utils/api";
import { useReducerAtom } from "jotai/utils";
import { NextRouter, useRouter } from "next/router";
import { memo } from "react";
import { reducer } from "@/src/helpers/reducer";
import ModalTafsir from "@/src/components/molecules/modalTafsir";
import Sebelumnya from "@/src/components/atoms/sebelumnya";
import Selanjutnya from "@/src/components/atoms/selanjutnya";
import DetailSurah from "@/src/components/organisms/detailSurah";
import Layout from "@/src/components/templates/layout";
import Loading from "@/src/components/atoms/loading";
import ErrorWhenFetch from "@/src/components/atoms/errorwhenFetch";
import Notification from "@/src/components/molecules/notification";

const Surah = () => {
  const [audio, dispatchAudio] = useReducerAtom(audioAtom, reducer);
  const [terjemahan, dispatchTerjemahan] = useReducerAtom(terjemahanAtom, reducer);
  const [tafsir, dispatchTafsir] = useReducerAtom(tafsirAtom, reducer);
  const [notification, dispatchNotification] = useReducerAtom(notificationAtom, reducer);

  const router: NextRouter = useRouter();
  const { number } = router.query;

  const { data, isLoading, isError } = useFetch(
    number ? `${QURAN_API}/quran/${number}?imamId=7` : null
  );

  if (isLoading) return <Loading />;
  if (isError) return <ErrorWhenFetch />;

  const surat = data.data;

  const PreviousOrNextButton = () => {
    return (
      <div className={`flex w-full gap-3 ${surat.number > 1 ? "justify-between" : "justify-end"}`}>
        <Sebelumnya surat={surat} />
        <Selanjutnya surat={surat} />
      </div>
    );
  };

  return (
    <Layout title={surat.asma.id.short}>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1>{surat.asma.id.short}</h1>
          <p className="font-medium tracking-wider">
            {surat.asma.translation.id}. Surat ke-{surat.number}. {surat.type.id}
          </p>
        </div>
        <div className="mt-1 flex gap-4">
          <button
            className="flex items-center gap-1"
            onClick={() => dispatchAudio({ type: "audio" })}
          >
            <MdVolumeUp size="20px" />
            <p className="text-lg font-bold">Audio</p>
          </button>
          <button
            className="flex items-center gap-1"
            onClick={() => dispatchTerjemahan({ type: "terjemahan" })}
          >
            <MdOutlineTranslate size="20px" />
            <p className="text-lg font-bold">Latin</p>
          </button>
          <button
            className="flex items-center gap-1"
            onClick={() => dispatchTafsir({ type: "tafsir" })}
          >
            <MdInsertComment size="20px" />
            <p className="text-lg font-bold">Tafsir</p>
          </button>
        </div>
        {tafsir && <ModalTafsir surat={surat} dispatchTafsir={dispatchTafsir} tafsir={tafsir} />}
      </div>
      <PreviousOrNextButton />
      <DetailSurah
        surat={surat}
        audio={audio}
        terjemahan={terjemahan}
        tafsir={tafsir}
        dispatchNotification={dispatchNotification}
      />
      <PreviousOrNextButton />
      {notification && <Notification dispatchNotification={dispatchNotification} />}
    </Layout>
  );
};

export default memo(Surah);
