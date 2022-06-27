import { suratProps } from "src/props";
import { memo, useState } from "react";
import { HiOutlineVolumeUp } from "react-icons/hi";
import { IoLanguageSharp } from "react-icons/io5";
import { GrInfo } from "react-icons/gr";
import DetailSurah from "src/components/detailSurah";
import Layout from "src/components/layout";
import Button from "src/components/button";

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

export const getStaticProps = async (context: any) => {
  try {
    const number = context.params.number;
    const response = await fetch(
      `https://quran-endpoint.vercel.app/quran/${number}?imamId=7`
    );
    const data = await response.json();
    console.log(data);
    return {
      props: {
        surat: data.data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const Surah = ({ surat }: any) => {
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
        <div className="flex gap-2 mt-1">
          <button className="flex gap-1 items-center" onClick={audioClick}>
            <HiOutlineVolumeUp size="20px" />
            <p className="font-bold text-lg">Audio</p>
          </button>
          <button className="flex gap-1 items-center" onClick={terjemahanClick}>
            <IoLanguageSharp size="20px" />
            <p className="font-bold text-lg">Latin</p>
          </button>
          <button className="flex gap-1 items-center" onClick={tafsirClick}>
            <GrInfo size="20px" />
            <p className="font-bold text-lg">Tafsir</p>
          </button>
        </div>
        {!tafsir ? (
          ""
        ) : (
          <div className="my-4">
            <p className="font-medium leading-relaxed">{surat.tafsir.id}</p>
          </div>
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
