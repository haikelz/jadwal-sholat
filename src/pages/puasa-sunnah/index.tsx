import { PuasaSunnah } from "@/interfaces";
import TableJadwalPuasaSunnah from "@/organisms/tableJadwalPuasaSunnah";
import Layout from "@/templates/layout";
import { PUASA_SUNNAH_API } from "@/utils/api";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";

const LazyLoadImage = dynamic(() => import("@/atoms/lazyLoadImage"));

export const getStaticProps: GetStaticProps = async () => {
  const response: Response = await fetch(PUASA_SUNNAH_API);
  const data = await response.json();

  return {
    props: {
      puasaSunnah: data.data,
    },
  };
};

const PuasaSunnah = ({ puasaSunnah }: PuasaSunnah) => {
  return (
    <Layout title="Jadwal Puasa Sunnah">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <h1>Jadwal Puasa Sunnah</h1>
          <LazyLoadImage src="/img/fasting.png" width={35} height={35} alt="Fasting" />
        </div>
        <p className="mt-2 text-lg font-medium">Berikut jadwal puasa sunnah bulan ini</p>
      </div>
      <div className="flex w-full justify-center gap-7 overflow-x-auto text-center">
        <TableJadwalPuasaSunnah puasaSunnah={puasaSunnah} />
      </div>
    </Layout>
  );
};

export default PuasaSunnah;
