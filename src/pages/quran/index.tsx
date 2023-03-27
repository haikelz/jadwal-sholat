import _fetch from "isomorphic-fetch";
import type { GetStaticProps } from "next";
import Image from "next/image";
import { QURAN_API } from "~lib/utils/constants";
import ListSurat from "~molecules/ListSurat";
import Layout from "~templates/Layout";
import { ListSuratProps } from "~types";

export const getStaticProps: GetStaticProps = async () => {
  const response = await _fetch(`${QURAN_API}/quran`);
  const data = await response.json();

  return {
    props: {
      surat: data.data,
    },
  };
};

export default function Quran({ surat }: ListSuratProps) {
  return (
    <Layout title="Baca Al-Qur'an">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center space-x-3">
          <h1>Baca Al-Qur&#39;an</h1>
          <Image src="/img/Quran.webp" width={40} height={40} alt="Al-Qur'an" />
        </div>
        <p className="mt-2 text-lg font-medium">
          &#34;Berlomba-lombalah kamu dalam berbuat kebaikan&#34;
        </p>
      </div>
      <ListSurat surat={surat} />
    </Layout>
  );
}
