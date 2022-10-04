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
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl">{waktu.lokasi}</h1>
        <p className="font-medium text-lg">
          PROVINSI {waktu.daerah}, {currentDate.toUpperCase()}
        </p>
      </div>
      <div className="text-center flex gap-7 lg:justify-center items-center overflow-x-auto w-full">
        <TableJadwalSholat
          tanggal={tanggal}
          tahun={tahun}
          bulan={bulan}
          waktu={waktu}
        />
      </div>
    </Layout>
  );
};

export default memo(KotaId);
