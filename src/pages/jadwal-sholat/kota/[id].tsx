import Layout from "src/components/layout";
import TableJadwal from "src/components/tableJadwal";

/* 
- Sengaja didefinisiin di global, karena bakal dipake lebih dari sekali
- Oh ya kenapa tanggalnya saya tambah 12? Karena hasil tanggalnya itu sebenarnya 3, jadi untuk menyesuaikan, saya tambah jadi: 
  3 + 12 = 15(tanggal hari ini)
*/
let date = new Date();
let tahun = date.getFullYear();
let bulan = date.getMonth() + 1;
let tanggal = date.getDay() + 12;

export const getStaticPaths = async () => {
  try {
    let response = await fetch(`https://api.myquran.com/v1/sholat/kota/semua`);
    let data = await response.json();

    const paths = data.map((city: any) => {
      return {
        params: { id: city.id },
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

export const getStaticProps = async (context: any) => {
  try {
    let formatDate = `${tahun}/${bulan}`;

    const id = context.params.id;
    const response = await fetch(
      `https://api.myquran.com/v1/sholat/jadwal/${id}/${formatDate}`
    );
    const data = await response.json();

    return {
      props: {
        city: data.data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const KotaId = ({ city }: any) => {
  return (
    <Layout title={city.lokasi}>
      <h1 className="font-bold text-3xl">{city.lokasi}</h1>
      <p className="font-semibold text-lg">
        PROVINSI {city.daerah}, {`${tahun}-${bulan}-${tanggal}`}
      </p>

      <div className="text-center flex gap-7 overflow-x-auto w-full">
        <TableJadwal city={city} />
      </div>
    </Layout>
  );
};

export default KotaId;
