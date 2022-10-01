import { JADWAL_SHOLAT_API } from "@/src/utils/api";
import { useFetch } from "@/src/hooks/useFetch";
import { memo } from "react";
import Layout from "@/src/components/templates/layout";
import SemuaKota from "@/src/components/molecules/listKota";
import Image from "next/image";
import LoadingText from "@/src/components/atoms/loadingText";
import ErrorText from "@/src/components/atoms/errorText";

const JadwalSholat = () => {
  const { data, isLoading, isError } = useFetch(
    `${JADWAL_SHOLAT_API}/kota/semua`
  );

  if (isLoading) return <LoadingText />;
  if (isError) return <ErrorText />;

  const kota = data;

  return (
    <Layout title="Jadwal Sholat">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center gap-3">
          <h1 className="sm:text-4xl text-3xl font-bold">Jadwal Sholat</h1>
          <Image
            src="/img/mosque.png"
            width="40px"
            height="40px"
            alt="Mosque"
            priority={true}
          />
        </div>
        <p className="font-medium mt-2 text-lg">
          Berikut daftar Kabupaten/Kota yang tersedia
        </p>
      </div>
      <SemuaKota kota={kota} />
    </Layout>
  );
};

export default memo(JadwalSholat);
