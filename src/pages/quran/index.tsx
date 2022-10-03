import { memo } from "react";
import { useFetch } from "@/src/hooks/useFetch";
import { QURAN_API } from "@/src/utils/api";
import ListSurah from "@/src/components/molecules/listSurah";
import Layout from "@/src/components/templates/layout";
import Image from "next/image";
import Loading from "@/src/components/atoms/loading";
import ErrorWhenFetch from "@/src/components/atoms/errorwhenFetch";

const Quran = () => {
  const { data, isLoading, isError } = useFetch(`${QURAN_API}/quran`);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorWhenFetch />;

  const surat = data.data;

  return (
    <Layout title="Baca Al-Qur'an">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center gap-3">
          <h1 className="sm:text-4xl text-3xl font-bold">Baca Al-Qur&#39;an</h1>
          <Image
            src="/img/Quran.png"
            width="40px"
            height="40px"
            alt="Al-Qur'an Image"
            priority={true}
          />
        </div>
        <p className="font-medium text-lg mt-2">
          &#34;Berlomba-lombalah kamu dalam berbuat kebaikan&#34;
        </p>
      </div>
      <ListSurah surat={surat} />
    </Layout>
  );
};

export default memo(Quran);
