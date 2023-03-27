import dynamic from "next/dynamic";
import { NextRouter, useRouter } from "next/router";
import { useFetch } from "~hooks";
import { bulan, currentDate, hari, tahun } from "~lib/helpers/formatDate";
import { JADWAL_SHOLAT_API } from "~lib/utils/constants";
import TableJadwalSholat from "~organisms/TableJadwalSholat";
import Layout from "~templates/Layout";

const Loading = dynamic(() => import("~molecules/Loading"));
const ErrorWhenFetch = dynamic(() => import("~molecules/ErrorWhenFetch"));

export default function KotaId() {
  const router: NextRouter = useRouter();
  const { id } = router.query;

  const formatDate: string = `${tahun}/${bulan}`;

  const { data, isLoading, isError } = useFetch(
    id ? `${JADWAL_SHOLAT_API}/jadwal/${id}/${formatDate}` : ""
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
