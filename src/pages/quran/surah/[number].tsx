import {
  MdInsertComment,
  MdOutlineTranslate,
  MdVolumeUp,
} from "react-icons/md";
import { Context, Surat, SuratPaths } from "@/src/interfaces";
import { audioAtom, tafsirAtom, terjemahanAtom } from "@/src/store";
import { QURAN_API } from "@/utils/api";
import { useReducerAtom } from "jotai/utils";
import { memo } from "react";
import ModalTafsir from "@/components/atoms/modalTafsir";
import Sebelumnya from "@/components/atoms/sebelumnya";
import Selanjutnya from "@/components/atoms/selanjutnya";
import DetailSurah from "@/src/components/organisms/detailSurah";
import Layout from "@/components/templates/layout";

export const getStaticPaths = async () => {
  try {
    const response: Response = await fetch(`${QURAN_API}/quran`);
    const data = await response.json();

    const paths = data.data.map((surat: SuratPaths) => {
      return {
        params: {
          number: surat.number.toString(),
        },
      };
    });

    return {
      paths,
      fallback: false,
    };
  } catch (err) {
    console.log(err);
  }
};

type NumberSurah = string | undefined;

export const getStaticProps = async (context: Context) => {
  try {
    const number: NumberSurah = context.params.number;
    const response: Response = await fetch(
      `${QURAN_API}/quran/${number}?imamId=7`
    );
    const data = await response.json();

    return {
      props: {
        surat: data.data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

type ReducerType = {
  type: string;
};

const audioReducer = (prev: boolean, action: ReducerType) => {
  if (action.type === "audio") return !prev;
  throw new Error("Unknown action type");
};

const terjemahanReducer = (prev: boolean, action: ReducerType) => {
  if (action.type === "terjemahan") return !prev;
  throw new Error("Unknown action type");
};

const tafsirReducer = (prev: boolean, action: ReducerType) => {
  if (action.type === "tafsir") return !prev;
  throw new Error("Unknown action type");
};

const Surah = ({ surat }: Surat) => {
  const [audio, dispatchAudio] = useReducerAtom(audioAtom, audioReducer);
  const [terjemahan, dispatchTerjemahan] = useReducerAtom(
    terjemahanAtom,
    terjemahanReducer
  );
  const [tafsir, dispatchTafsir] = useReducerAtom(tafsirAtom, tafsirReducer);

  const PreviousOrNextButton = () => {
    return (
      <div
        className={`flex gap-3 w-full ${
          surat.number > 1 ? "justify-between" : "justify-end"
        }`}
      >
        <Sebelumnya surat={surat} />
        <Selanjutnya surat={surat} />
      </div>
    );
  };

  return (
    <Layout title={surat.asma.id.short}>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl">{surat.asma.id.short}</h1>
          <p className="font-medium tracking-wider">
            {surat.asma.translation.id}. Surat ke-{surat.number}.{surat.type.id}
          </p>
        </div>
        <div className="flex gap-4 mt-1">
          <button
            className="flex gap-1 items-center"
            onClick={() => dispatchAudio({ type: "audio" })}
          >
            <MdVolumeUp size="20px" />
            <p className="font-bold text-lg">Audio</p>
          </button>
          <button
            className="flex gap-1 items-center"
            onClick={() => dispatchTerjemahan({ type: "terjemahan" })}
          >
            <MdOutlineTranslate size="20px" />
            <p className="font-bold text-lg">Latin</p>
          </button>
          <button
            className="flex gap-1 items-center"
            onClick={() => dispatchTafsir({ type: "tafsir" })}
          >
            <MdInsertComment size="20px" />
            <p className="font-bold text-lg">Tafsir</p>
          </button>
        </div>
        {tafsir && (
          <ModalTafsir
            surat={surat}
            dispatchTafsir={dispatchTafsir}
            tafsir={tafsir}
          />
        )}
      </div>
      <PreviousOrNextButton />
      <DetailSurah
        surat={surat}
        audio={audio}
        terjemahan={terjemahan}
        tafsir={tafsir}
      />
      <PreviousOrNextButton />
    </Layout>
  );
};

export default memo(Surah);
