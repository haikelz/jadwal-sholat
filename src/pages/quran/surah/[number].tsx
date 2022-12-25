import { MdInsertComment, MdOutlineTranslate, MdVolumeUp } from "react-icons/md";
import { useFetch } from "@/hooks/useFetch";
import { audioAtom, notificationAtom, tafsirAtom, terjemahanAtom } from "@/store";
import { QURAN_API } from "@/utils/api";
import { useReducerAtom } from "jotai/utils";
import { NextRouter, useRouter } from "next/router";
import { memo } from "react";
import { reducer } from "@/helpers/reducer";
import Layout from "@/components/templates/layout";
import Loading from "@/components/atoms/loading";
import ErrorWhenFetch from "@/components/atoms/errorwhenFetch";
import dynamic from "next/dynamic";
import PreviousOrNextButton from "@/components/molecules/previousOrNextButton";
import DetailSurah from "@/components/organisms/detailSurah";

const ModalTafsir = dynamic(() => import("@/components/molecules/modalTafsir"));
const Notification = dynamic(() => import("@/components/molecules/notification"));

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
      <PreviousOrNextButton surat={surat} />
      <DetailSurah
        surat={surat}
        audio={audio}
        terjemahan={terjemahan}
        tafsir={tafsir}
        dispatchNotification={dispatchNotification}
      />
      <PreviousOrNextButton surat={surat} />
      {notification && <Notification dispatchNotification={dispatchNotification} />}
    </Layout>
  );
};

export default memo(Surah);
