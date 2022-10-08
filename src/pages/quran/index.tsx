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
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <h1>Baca Al-Qur&#39;an</h1>
          <Image
            src="/img/Quran.png"
            width="40px"
            height="40px"
            alt="Al-Qur'an Image"
            priority={true}
          />
        </div>
        <p className="mt-2 text-lg font-medium">
          &#34;Berlomba-lombalah kamu dalam berbuat kebaikan&#34;
        </p>
      </div>
      <ListSurah surat={surat} />
    </Layout>
  );
};

export default memo(Quran);
