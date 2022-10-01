import { JADWAL_SHOLAT_API } from "@/src/utils/api";
import { useFetch } from "@/src/hooks/useFetch";
import { NextRouter, useRouter } from "next/router";
import { memo } from "react";
import { tanggal, tahun, bulan, currentDate } from "@/src/utils/date";
import Layout from "@/src/components/templates/layout";
import TableJadwalSholat from "@/src/components/organisms/tableJadwalSholat";
import LoadingText from "@/src/components/atoms/loadingText";
import ErrorText from "@/src/components/atoms/errorText";

const KotaId = () => {
  const router: NextRouter = useRouter();
  const id: string | string[] | undefined = router.query.id;
  let formatDate: string = `${tahun}/${bulan}`;

  const { data, isLoading, isError } = useFetch(
    `${JADWAL_SHOLAT_API}/jadwal/${id}/${formatDate}`
  );

  if (isLoading) return <LoadingText />;
  if (isError) return <ErrorText />;

  const waktu = data.data;

  return (
    <Layout title={waktu.lokasi}>
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
