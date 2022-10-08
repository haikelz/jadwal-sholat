import { useFetch } from "@/src/hooks/useFetch";
import { JADWAL_SHOLAT_API } from "@/src/utils/api";
import { bulan, currentDate, tahun, tanggal } from "@/src/utils/date";
import { NextRouter, useRouter } from "next/router";
import { memo } from "react";
import TableJadwalSholat from "@/src/components/organisms/tableJadwalSholat";
import Layout from "@/src/components/templates/layout";
import Loading from "@/src/components/atoms/loading";

const KotaId = () => {
  const router: NextRouter = useRouter();
  const { id } = router.query;
  let formatDate: string = `${tahun}/${bulan}`;

  const { data, isLoading, isError } = useFetch(
    id ? `${JADWAL_SHOLAT_API}/jadwal/${id}/${formatDate}` : null
  );

  if (isLoading) return <Loading />;
  if (isError) return <p>Error!</p>;

  const waktu = data.data;

  return (
    <Layout title={`Jadwal Sholat ${waktu.lokasi}`}>
      <div className="flex flex-col items-center justify-center">
        <h1>{waktu.lokasi}</h1>
        <p className="text-lg font-medium">
          PROVINSI {waktu.daerah}, {currentDate.toUpperCase()}
        </p>
      </div>
      <div className="flex w-full items-center gap-7 overflow-x-auto text-center lg:justify-center">
        <TableJadwalSholat tanggal={tanggal} tahun={tahun} bulan={bulan} waktu={waktu} />
      </div>
    </Layout>
  );
};

export default memo(KotaId);
