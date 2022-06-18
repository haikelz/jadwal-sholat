import Layout from "src/components/layout";
import SemuaKota from "src/components/semuaKota";
import Image from "next/image";

export const getStaticProps = async () => {
  try {
    let response = await fetch(`https://api.myquran.com/v1/sholat/kota/semua`);
    let data = await response.json();

    return {
      props: {
        kota: data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const JadwalSholat = ({ kota }: any) => {
  return (
    <Layout title="Jadwal Sholat">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center gap-3">
          <h1 className="sm:text-4xl text-3xl font-bold">Jadwal Sholat</h1>
          <Image
            src="/img/mosque.png"
            width="50px"
            height="50px"
            alt="Mosque"
          />
        </div>
        <p className="font-medium mt-2 text-xl">
          Berikut daftar Kabupaten/Kota yang tersedia
        </p>
      </div>
      <SemuaKota kota={kota} />
    </Layout>
  );
};

export default JadwalSholat;
