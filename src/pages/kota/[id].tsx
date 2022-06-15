import Layout from "src/components/layout";

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
        params: { id: city.id.toString() },
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

interface cityProps {
  city: {
    id: string;
    lokasi: string;
    date: string;
    daerah: string;
  };
}

interface waktuProps {
  waktu: {
    tanggal: string;
    imsak: string;
    terbit: string;
    dhuha: string;
    dzuhur: string;
    ashar: string;
    maghrib: string;
    isya: string;
  };
}

const KotaId = ({ city }: any) => {
  return (
    <Layout title={city.lokasi}>
      <h1 className="font-bold text-3xl">{city.lokasi}</h1>
      <p className="font-semibold text-lg">
        PROVINSI {city.daerah}, {`${tahun}-${bulan}-${tanggal}`}
      </p>

      <div className="text-center flex gap-7 overflow-x-auto w-full">
        <table className="border-2 border-black table-fixed">
          <thead className="border-2 border-black">
            <tr className="border-2 border-black">
              <th className="border-r-2 border-r-black text-xl px-4">
                Tanggal
              </th>
              <th className="border-r-2 border-r-black text-xl px-4">Imsak</th>
              <th className="border-r-2 border-r-black text-xl px-4">Subuh</th>
              <th className="border-r-2 border-r-black text-sm lg:text-xl px-4">
                Terbit
              </th>
              <th className="border-r-2 border-r-black text-xl px-4">Dhuha</th>
              <th className="border-r-2 border-r-black text-xl px-4">Dzuhur</th>
              <th className="border-r-2 border-r-black text-xl px-4">Ashar</th>
              <th className="border-r-2 border-r-black text-xl px-4">
                Maghrib
              </th>
              <th className="text-xl">Isya</th>
            </tr>
          </thead>
          <tbody>
            {city.jadwal.map((waktu: any, index: number) => (
              <tr className="border-b-black border-b-2" key={index + 1}>
                <td className="border-r-2 border-r-black px-4 text-xl">
                  {waktu.tanggal}
                </td>
                <td className="border-r-2 border-r-black px-4 text-xl">
                  {waktu.imsak}
                </td>
                <td className="border-r-2 border-r-black px-4 text-xl">
                  {waktu.subuh}
                </td>
                <td className="border-r-2 border-r-black px-4 text-xl">
                  {waktu.terbit}
                </td>
                <td className="border-r-2 border-r-black px-4 text-xl">
                  {waktu.dhuha}
                </td>
                <td className="border-r-2 border-r-black px-4 text-xl">
                  {waktu.dzuhur}
                </td>
                <td className="border-r-2 border-r-black px-4 text-xl">
                  {waktu.ashar}
                </td>
                <td className="border-r-2 border-r-black px-4 text-xl">
                  {waktu.maghrib}
                </td>
                <td className="border-r-2 border-r-black px-4 text-xl">
                  {waktu.isya}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default KotaId;
