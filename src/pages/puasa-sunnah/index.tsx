import { PUASA_SUNNAH_API } from "@/utils/api";
import { PuasaSunnah } from "@/src/interfaces";
import { memo } from "react";
import Layout from "@/components/templates/layout";
import Image from "next/image";
import TableJadwalPuasaSunnah from "@/components/organisms/tableJadwalPuasaSunnah";

export const getStaticProps = async () => {
  try {
    const response: Response = await fetch(`${PUASA_SUNNAH_API}`);
    const data = await response.json();

    return {
      props: {
        puasaSunnah: data.data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const PuasaSunnah = ({ puasaSunnah }: PuasaSunnah) => {
  return (
    <Layout title="Jadwal Puasa Sunnah">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center gap-3">
          <h1 className="sm:text-4xl text-3xl font-bold">
            Jadwal Puasa Sunnah
          </h1>
          <Image
            src="/img/fasting.png"
            width="35px"
            height="35px"
            alt="Fasting"
            priority={true}
          />
        </div>
        <p className="font-medium mt-2 text-lg">
          Berikut jadwal puasa sunnah bulan ini
        </p>
      </div>
      <div className="text-center flex gap-7 justify-center overflow-x-auto w-full">
        <TableJadwalPuasaSunnah puasaSunnah={puasaSunnah} />
      </div>
    </Layout>
  );
};

export default memo(PuasaSunnah);
