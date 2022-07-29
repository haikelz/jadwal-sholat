import { Kota } from "src/props";
import { memo } from "react";
import Layout from "src/components/layout";
import SemuaKota from "src/components/semuaKota";
import Image from "next/image";

export const getStaticProps = async () => {
  try {
    const response: Response = await fetch(
      `https://api.myquran.com/v1/sholat/kota/semua`
    );
    const data = await response.json();

    return {
      props: {
        kota: data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const JadwalSholat = ({ kota }: Kota) => {
  return (
    <Layout title="Jadwal Sholat">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center gap-3">
          <h1 className="sm:text-4xl text-3xl font-bold">Jadwal Sholat</h1>
          <Image
            src="/img/mosque.png"
            width="40px"
            height="40px"
            alt="Mosque"
          />
        </div>
        <p className="font-medium mt-2 text-lg">
          Berikut daftar Kabupaten/Kota yang tersedia
        </p>
      </div>
      <SemuaKota kota={kota} />
    </Layout>
  );
};

export default memo(JadwalSholat);
