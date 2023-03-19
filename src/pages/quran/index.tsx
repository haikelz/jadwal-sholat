import Image from "next/image";
import ErrorWhenFetch from "~molecules/ErrorWhenFetch";
import Loading from "~molecules/Loading";
import { useFetch } from "~hooks/useFetch";
import { QURAN_API } from "~lib/utils/constants";
import ListSurah from "~molecules/ListSurah";
import Layout from "~templates/Layout";

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
          <Image src="/img/Quran.webp" width={40} height={40} alt="Al-Qur'an" />
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
