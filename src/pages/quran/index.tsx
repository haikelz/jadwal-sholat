import type { GetStaticProps } from "next";
import Image from "next/image";
import Layout from "~components/Layout";
import ListSurat from "~components/molecules/ListSurat";
import { ofetch } from "~lib/utils/configuredOfetch";
import { QURAN_API } from "~lib/utils/constants";
import { ListSuratProps } from "~models";

export const getStaticProps: GetStaticProps = async () => {
  const response = await ofetch(`${QURAN_API}/quran`);

  return {
    props: {
      surat: response.data,
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
