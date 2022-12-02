import { memo } from "react";
import { useFetch } from "@/hooks/useFetch";
import { JADWAL_SHOLAT_API } from "@/utils/api";
import Layout from "@/components/templates/layout";
import ListKota from "@/components/molecules/listKota";
import Image from "next/image";
import Loading from "@/components/atoms/loading";
import ErrorWhenFetch from "@/components/atoms/errorwhenFetch";

const JadwalSholat = () => {
  const { data, isLoading, isError } = useFetch(`${JADWAL_SHOLAT_API}/kota/semua`);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorWhenFetch />;

  const kota = data;

  return (
    <Layout title="Jadwal Sholat">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <h1>Jadwal Sholat</h1>
          <Image src="/img/mosque.png" width="40px" height="40px" alt="Mosque" priority={true} />
        </div>
        <p className="mt-2 text-lg font-medium">Berikut daftar Kabupaten/Kota yang tersedia</p>
      </div>
      <ListKota kota={kota} />
    </Layout>
  );
};

export default memo(JadwalSholat);
