import ErrorWhenFetch from "@/atoms/errorwhenFetch";
import Loading from "@/atoms/loading";
import PriorityImage from "@/atoms/priorityImage";
import { useFetch } from "@/hooks/useFetch";
import ListKota from "@/molecules/listKota";
import Layout from "@/templates/layout";
import { JADWAL_SHOLAT_API } from "@/utils/api";

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
          <PriorityImage src="/img/mosque.webp" width={40} height={40} alt="Mosque" />
        </div>
        <p className="mt-2 text-lg font-medium">Berikut daftar Kabupaten/Kota yang tersedia</p>
      </div>
      <ListKota kota={kota} />
    </Layout>
  );
};

export default JadwalSholat;
