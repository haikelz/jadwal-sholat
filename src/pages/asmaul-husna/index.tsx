import { GetStaticProps } from "next";
import Layout from "~components/Layout";
import { ListAsmaulHusna } from "~components/organisms";
import { env } from "~env.mjs";
import { ofetch } from "~lib/utils/configuredOfetch";
import { AsmaulHusnaProps } from "~models";

const { NEXT_PUBLIC_ASMAUL_HUSNA_API } = env;

export const getStaticProps: GetStaticProps = async () => {
  const response = await ofetch(`${NEXT_PUBLIC_ASMAUL_HUSNA_API}/all`);

  return {
    props: {
      asmaulHusna: response,
    },
  };
};

export default function AsmaulHusna({ asmaulHusna }: AsmaulHusnaProps) {
  return (
    <Layout title="Asma'ul Husna">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <h1>Asma&#39;ul Husna</h1>
        </div>
        <p className="mt-2 text-lg font-medium">Berikut daftar Asma&#39;ul Husna</p>
      </div>
      <ListAsmaulHusna asmaulHusna={asmaulHusna} />
    </Layout>
  );
}
