import Link from "next/link";
import Sebelumnya from "src/components/button/sebelumnya";
import Selanjutnya from "src/components/button/selanjutnya";
import Layout from "src/components/layout";

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

interface suratProps {
  surat: {
    number: number;
    name: {
      transliteration: {
        id: string;
      };
      translation: {
        id: string;
      };
    };
    text: string;
    verses: [
      text: {
        arab: string;
      }
    ];
  };
}

const Surah = ({ surat }: suratProps) => {
  return (
    <Layout>
      <div>
        <h1 className="font-bold text-3xl">{surat.name.transliteration.id}</h1>
        <div className="flex justify-center items-center">
          <p>
            {surat.name.translation.id}. Surat ke-{surat.number}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 text-end grid-rows-1">
        {surat.verses.map((ayat: any, index: number) => (
          <div
            className="p-4 flex flex-col mb-4 justify-end items-end"
            key={index + 1}
          >
            <div className="flex w-full items-center justify-between">
              <p>{ayat.number.inSurah}</p>
              <p className="text-4xl">{ayat.text.arab}</p>
            </div>
            <div className="flex justify-start mt-4 w-full">
              <p>{ayat.translation.id}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 w-full justify-between">
        <Sebelumnya surat={surat} />
        <Selanjutnya surat={surat} />
      </div>
    </Layout>
  );
};

export default Surah;
