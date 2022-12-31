import ListAsmaulHusna from "@/molecules/listAsmaulHusna";
import Layout from "@/templates/layout";
import { memo } from "react";

const AsmaulHusna = () => {
  return (
    <Layout title="Asma'ul Husna">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <h1>Asma&#39;ul Husna</h1>
        </div>
        <p className="mt-2 text-lg font-medium">Berikut daftar Asma&#39;ul Husna</p>
      </div>
      <ListAsmaulHusna />
    </Layout>
  );
};

export default memo(AsmaulHusna);
