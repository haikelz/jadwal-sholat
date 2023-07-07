import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "~components/Layout";
import { TableJadwalSholat } from "~components/organisms";
import { env } from "~env.mjs";
import { useFetch } from "~hooks";
import { bulan, currentDate, hari, tahun } from "~lib/utils/constants";

const Loading = dynamic(() => import("~components/molecules").then((obj) => obj.Loading));
const ErrorWhenFetch = dynamic(() =>
  import("~components/molecules").then((obj) => obj.ErrorWhenFetch)
);

export default function KotaId() {
  const router = useRouter();
  const { id } = router.query;
  const { NEXT_PUBLIC_JADWAL_SHOLAT_API } = env;

  const formatDate: string = `${tahun}/${bulan}`;
  const { data, isLoading, isError } = useFetch(
    id ? `${NEXT_PUBLIC_JADWAL_SHOLAT_API}/jadwal/${id}/${formatDate}` : ""
  );

  if ((!data && !isError) || isLoading) return <Loading />;
  if (isError || typeof data.data === "undefined") return <ErrorWhenFetch />;

  const waktu = data.data;

  return (
    <Layout title={`Jadwal Sholat ${waktu.lokasi}`}>
      <div className="flex flex-col items-center justify-center">
        <h1>{waktu.lokasi}</h1>
        <p className="text-lg font-medium">
          PROVINSI {waktu.daerah}, {currentDate.toUpperCase()}
        </p>
      </div>
      <div className="flex w-full items-center overflow-x-auto text-center lg:justify-center">
        <TableJadwalSholat tanggal={hari} tahun={tahun} bulan={bulan} waktu={waktu} />
      </div>
    </Layout>
  );
}
