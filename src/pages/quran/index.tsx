import Layout from "src/components/layout";
import ListSurah from "src/components/listSurah";

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

interface surahProps {
  surah: {
    number: string;
    translation: {
      id: string;
    };
  };
}

const Quran = ({ surah }: any) => {
  return (
    <Layout>
      <ListSurah surah={surah} />
    </Layout>
  );
};

export default Quran;
