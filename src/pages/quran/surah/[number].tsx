import { contextProps, suratProps } from "src/props";
import { memo, useState } from "react";
import {
  MdInsertComment,
  MdVolumeUp,
  MdOutlineTranslate,
} from "react-icons/md";
import DetailSurah from "src/components/detailSurah";
import Layout from "src/components/layout";
import Button from "src/components/button";
import ModalTafsir from "src/components/detailSurah/modalTafsir";

export const getStaticPaths = async () => {
  try {
    const response = await fetch(`https://quran-endpoint.vercel.app/quran`);
    const data = await response.json();

    const paths = data.data.map((surat: any) => {
      return {
        params: { number: surat.number.toString() },
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

export const getStaticProps = async (context: contextProps) => {
  try {
    const number = context.params.number;
    const response = await fetch(
      `https://quran-endpoint.vercel.app/quran/${number}?imamId=7`
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

const Surah = ({ surat }: suratProps) => {
  const [audio, setAudio] = useState(false);
  const [terjemahan, setTerjemahan] = useState(false);
  const [tafsir, setTafsir] = useState(false);

  const audioClick = () => setAudio(!audio);
  const terjemahanClick = () => setTerjemahan(!terjemahan);
  const tafsirClick = () => setTafsir(!tafsir);

  return (
    <Layout title={`Baca Al-Qur'an`}>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl">{surat.asma.id.short}</h1>
          <p className="font-medium tracking-wider">
            {surat.asma.translation.id}. Surat ke-{surat.number}
          </p>
        </div>
        <div className="flex gap-4 mt-1">
          <button className="flex gap-1 items-center" onClick={audioClick}>
            <MdVolumeUp size="20px" />
            <p className="font-bold text-lg">Audio</p>
          </button>
          <button className="flex gap-1 items-center" onClick={terjemahanClick}>
            <MdOutlineTranslate size="20px" />
            <p className="font-bold text-lg">Latin</p>
          </button>
          <button className="flex gap-1 items-center" onClick={tafsirClick}>
            <MdInsertComment size="20px" />
            <p className="font-bold text-lg">Tafsir</p>
          </button>
        </div>
        {!tafsir ? (
          ""
        ) : (
          <ModalTafsir
            surat={surat}
            tafsirClick={tafsirClick}
            tafsir={tafsir}
          />
        )}
      </div>
      <Button surat={surat} />
      <DetailSurah
        surat={surat}
        audio={audio}
        terjemahan={terjemahan}
        tafsir={tafsir}
      />
      <Button surat={surat} />
    </Layout>
  );
};

export default memo(Surah);
