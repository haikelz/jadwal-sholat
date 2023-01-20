import ErrorWhenFetch from "@/atoms/errorwhenFetch";
import Loading from "@/atoms/loading";
import PriorityImage from "@/atoms/priorityImage";
import { useFetch } from "@/hooks/useFetch";
import ListSurah from "@/molecules/listSurah";
import Layout from "@/templates/layout";
import { QURAN_API } from "@/lib/utils/api";

const Quran = () => {
  const { data, isLoading, error } = useFetch(`${QURAN_API}/quran`);

  if (isLoading) return <Loading />;
  if (error) return <ErrorWhenFetch />;

  const surat = data.data;

  return (
    <Layout title="Baca Al-Qur'an">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <h1>Baca Al-Qur&#39;an</h1>
          <PriorityImage src="/img/Quran.webp" width={40} height={40} alt="Al-Qur'an Image" />
        </div>
        <p className="mt-2 text-lg font-medium">
          &#34;Berlomba-lombalah kamu dalam berbuat kebaikan&#34;
        </p>
      </div>
      <ListSurah surat={surat} />
    </Layout>
  );
};

export default Quran;
