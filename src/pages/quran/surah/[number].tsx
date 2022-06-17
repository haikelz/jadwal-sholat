import { suratProps } from "src/types";
import { useState } from "react"; 
import DetailSurah from "src/components/detailSurah";
import Layout from "src/components/layout";
import Button from "src/components/button";

export const getStaticPaths = async () => {
  try {
    const response = await fetch(`https://api.quran.sutanlab.id/surah`);
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
      `https://api.quran.sutanlab.id/surah/${number}`
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

  const audioClick = () => setAudio(!audio);
  return (
    <Layout>
      <div>
        <h1 className="font-bold text-3xl">{surat.name.transliteration.id}</h1>
        <div className="flex justify-center items-center">
          <p>
            {surat.name.translation.id}. Surat ke-{surat.number}
          </p>
        </div>
        <button onClick={audioClick}>Pencet</button>
      </div>
      <Button surat={surat} />
      <DetailSurah surat={surat} audio={audio}/>
      <Button surat={surat} />
    </Layout>
  );
};

export default Surah;
