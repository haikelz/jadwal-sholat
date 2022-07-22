import { contextProps, waktuProps, kotaPathsProps } from "src/props";
import { memo } from "react";
import { tanggal, tahun, bulan, currentDate } from "src/utils/date";
import Layout from "src/components/layout";
import TableJadwalSholat from "src/components/tableJadwalSholat";

export const getStaticPaths = async () => {
  try {
    const response = await fetch(
      `https://api.myquran.com/v1/sholat/kota/semua`
    );
    const data = await response.json();

    const paths = data.map((waktu: kotaPathsProps) => {
      return {
        params: { id: waktu.id == "3212" ? (waktu.id = "3211") : waktu.id },
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

export const getStaticProps = async (context: contextProps) => {
  try {
    let formatDate = `${tahun}/${bulan}`;

    const id = context.params.id;
    const response = await fetch(
      `https://api.myquran.com/v1/sholat/jadwal/${id}/${formatDate}`
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

const KotaId = ({ waktu }: waktuProps) => {
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
