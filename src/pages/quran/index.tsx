import Layout from "src/components/layout";
import ListSurah from "src/components/listSurah";
import Image from "next/image";
import { listSurahProps } from "src/types";

export const getStaticProps = async () => {
  try {
    const response = await fetch(`https://api.quran.sutanlab.id/surah`);
    const data = await response.json();

    return {
      props: {
        surah: data.data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const Quran = ({ surah }: listSurahProps) => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center gap-3">
          <h1 className="sm:text-4xl text-3xl font-bold">Baca Al-Qur'an</h1>
          <Image src="/img/Quran.png" width="50px" height="50px" />
        </div>
        <p className="font-medium text-xl mt-2">
          "Berlomba-lombalah kamu dalam berbuat kebaikan"
        </p>
      </div>
      <ListSurah surah={surah} />
    </Layout>
  );
};

export default Quran;
