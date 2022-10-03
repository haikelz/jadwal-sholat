import { memo } from "react";
import { PUASA_SUNNAH_API } from "@/src/utils/api";
import { useFetch } from "@/src/hooks/useFetch";
import Layout from "@/src/components/templates/layout";
import Image from "next/image";
import TableJadwalPuasaSunnah from "@/src/components/organisms/tableJadwalPuasaSunnah";
import Loading from "@/src/components/atoms/loading";
import ErrorWhenFetch from "@/src/components/atoms/errorwhenFetch";

const PuasaSunnah = () => {
  const { data, isLoading, isError } = useFetch(`${PUASA_SUNNAH_API}`);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorWhenFetch />;

  const puasaSunnah = data.data;

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
