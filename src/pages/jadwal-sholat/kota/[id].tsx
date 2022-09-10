import { JADWAL_SHOLAT_API } from "@/utils/api";
import { Context, Waktu, KotaPaths } from "@/src/interfaces";
import { memo } from "react";
import { tanggal, tahun, bulan, currentDate } from "@/utils/date";
import Layout from "@/components/templates/layout";
import TableJadwalSholat from "@/components/organisms/tableJadwalSholat";

export const getStaticPaths = async () => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

type Id = string | undefined;

export const getStaticProps = async (context: Context) => {
  try {
    let formatDate: string = `${tahun}/${bulan}`;
    const id: Id = context.params.id;
    const response: Response = await fetch(
      `${JADWAL_SHOLAT_API}/jadwal/${id}/${formatDate}`
    );
    const data = await response.json();

    return {
      props: {
        waktu: data.data,
      },
    };
  } catch (err) {
    console.log(err);
  }
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
      <div className="text-center flex gap-7 xl:justify-center overflow-x-auto w-full">
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
