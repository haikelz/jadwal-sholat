import PriorityImage from "~atoms/priorityImage";
import TableJadwalPuasaSunnah from "~organisms/tableJadwalPuasaSunnah";
import Layout from "~templates/layout";
import { PuasaSunnahProps } from "~types";
import { PUASA_SUNNAH_API } from "~lib/utils/api";
import { GetStaticProps } from "next";

// kalo pake useFetch, malah kena CORS. Instead, we use getStaticProps
export const getStaticProps: GetStaticProps = async () => {
  const response: Response = await fetch(PUASA_SUNNAH_API);
  const data = await response.json();

  return {
    props: {
      puasaSunnah: data.data,
    },
  };
};

const PuasaSunnah = ({ puasaSunnah }: PuasaSunnahProps) => {
  return (
    <Layout title="Jadwal Puasa Sunnah">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <h1>Jadwal Puasa Sunnah</h1>
          <PriorityImage src="/img/fasting.webp" width={35} height={35} alt="Fasting" />
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
