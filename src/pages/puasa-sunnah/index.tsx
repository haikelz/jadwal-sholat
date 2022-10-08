import { memo } from "react";
import { PuasaSunnah } from "@/src/interfaces";
import { PUASA_SUNNAH_API } from "@/src/utils/api";
import { GetStaticProps } from "next";
import TableJadwalPuasaSunnah from "@/src/components/organisms/tableJadwalPuasaSunnah";
import Layout from "@/src/components/templates/layout";
import Image from "next/image";

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
          <Image
            src="/img/fasting.png"
            width="35px"
            height="35px"
            alt="Fasting"
            priority={true}
          />
        </div>
        <p className="mt-2 text-lg font-medium">
          Berikut jadwal puasa sunnah bulan ini
        </p>
      </div>
      <div className="flex w-full justify-center gap-7 overflow-x-auto text-center">
        <TableJadwalPuasaSunnah puasaSunnah={puasaSunnah} />
      </div>
    </Layout>
  );
};

export default memo(PuasaSunnah);
