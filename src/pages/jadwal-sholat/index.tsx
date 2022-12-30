import ErrorWhenFetch from "@/atoms/errorwhenFetch";
import Loading from "@/atoms/loading";
import { useFetch } from "@/hooks/useFetch";
import ListKota from "@/molecules/listKota";
import Layout from "@/templates/layout";
import { JADWAL_SHOLAT_API } from "@/utils/api";
import dynamic from "next/dynamic";

const LazyLoadImage = dynamic(() => import("@/atoms/lazyLoadImage"));

const JadwalSholat = () => {
  const { data, isLoading, error } = useFetch(`${JADWAL_SHOLAT_API}/kota/semua`);

  if (isLoading) return <Loading />;
  if (error) return <ErrorWhenFetch />;

  const kota = data;

  return (
    <Layout title="Jadwal Sholat">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <h1>Jadwal Sholat</h1>
          <LazyLoadImage src="/img/mosque.png" width={40} height={40} alt="Mosque" />
        </div>
        <p className="mt-2 text-lg font-medium">Berikut daftar Kabupaten/Kota yang tersedia</p>
      </div>
      <ListKota kota={kota} />
    </Layout>
  );
};

export default JadwalSholat;
