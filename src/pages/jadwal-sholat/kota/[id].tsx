import Layout from "src/components/layout";
import TableJadwal from "src/components/tableJadwal";

/* 
> Cara lama, tapi ga relevan karena malah muncul error pas build

- Sengaja didefinisiin di global, karena bakal dipake lebih dari sekali
- Oh ya kenapa tanggalnya saya tambah 12? Karena hasil tanggalnya itu sebenarnya 3, jadi untuk menyesuaikan, saya tambah jadi: 
  3 + 12 = 15(tanggal hari ini)
*/
let date = new Date();

// Ndak relevan, tapi tetep dipake buat nampilin waktu di bagian judul
let tahun = date.getFullYear();
let bulan = date.getMonth() + 1;
let tanggal = date.getDay() + 12;

/* > Cara yang benar dengan menggunakan toLocaleDate String, dan set timezone nya ke jepang(ja-jp) 
Expected output: year/month 
*/
let showDate = date.toLocaleDateString("ja-jp", {
  year: "numeric",
  month: "numeric",
});
console.log(showDate);

export const getStaticPaths = async () => {
  try {
    const response = await fetch(
      `https://api.myquran.com/v1/sholat/kota/semua`
    );
    const data = await response.json();

    const paths = data.map((waktu: any) => {
      return {
        params: { id: waktu.id },
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
        waktu: data.data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const KotaId = ({ waktu }: any) => {
  return (
    <Layout title={`Jadwal Sholat ${waktu.lokasi}`}>
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl">{waktu.lokasi}</h1>
        <p className="font-semibold text-lg">
          PROVINSI {waktu.daerah}, {`${tahun}-${bulan}-${tanggal}`}
        </p>
      </div>

      <div className="text-center flex gap-7 xl:justify-center overflow-x-auto w-full">
        <TableJadwal waktu={waktu} />
      </div>
    </Layout>
  );
};

export default KotaId;
