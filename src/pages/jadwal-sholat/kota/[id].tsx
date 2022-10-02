import { KotaPaths, Waktu } from "@/src/interfaces";
import { JADWAL_SHOLAT_API } from "@/src/utils/api";
import { bulan, currentDate, tahun, tanggal } from "@/src/utils/date";
import { GetStaticPaths, GetStaticProps } from "next";
import { memo } from "react";
import TableJadwalSholat from "@/src/components/organisms/tableJadwalSholat";
import Layout from "@/src/components/templates/layout";

export const getStaticPaths: GetStaticPaths = async () => {
  const response: Response = await fetch(`${JADWAL_SHOLAT_API}/kota/semua`);
  const data = await response.json();

  const paths = data.map((waktu: KotaPaths) => {
    return {
      params: {
        id: waktu.id === "3212" ? (waktu.id = "3211") : waktu.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let formatDate: string = `${tahun}/${bulan}`;

  const { id } = params as { id: string };
  const response: Response = await fetch(
    `${JADWAL_SHOLAT_API}/jadwal/${id}/${formatDate}`
  );
  const data = await response.json();

  return {
    props: {
      waktu: data.data,
    },
  };
};

const KotaId = ({ waktu }: Waktu) => {
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
