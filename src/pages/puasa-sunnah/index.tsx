import { memo } from "react";
import { puasaProps } from "src/props";
import Layout from "src/components/layout";
import TableJadwalPuasaSunnah from "src/tableJadwalPuasaSunnah";
import Image from "next/image";

export const getStaticProps = async () => {
  try {
    const response = await fetch(
      "https://api.puasa-sunnah.granitebps.com/api/v1/fastings"
    );
    const data = await response.json();

    return {
      props: {
        puasa: data.data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const PuasaSunnah = ({ puasa }: puasaProps) => {
  return (
    <Layout title="Puasa sunnah bulanan">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center gap-3">
          <h1 className="sm:text-4xl text-3xl font-bold">
            Jadwal Puasa Sunnah
          </h1>
          <Image
            src="/img/fasting.png"
            width="40px"
            height="40px"
            alt="Fasting"
          />
        </div>
        <p className="font-medium mt-2 text-lg">
          Berikut jadwal puasa sunnah bulan ini
        </p>
      </div>
      <TableJadwalPuasaSunnah puasa={puasa} />
    </Layout>
  );
};

export default memo(PuasaSunnah);
