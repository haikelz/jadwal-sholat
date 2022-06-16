interface cityProps {
  city: {
    id: string;
    lokasi: string;
    date: string;
    daerah: string;
    jadwal: any;
  };
}

let date = new Date();
let tahun = date.getFullYear();
let bulan = date.getMonth() + 1;
let tanggal = date.getDay() + 12;

/*
Logicnya: karena ada ketidaksesuaian lagi antara format bulan di bawaan JS dengan yang ada di API, jadi saya buat seperti ini
- Jika bulannya kurang dari 10, maka tambahkan 0 di depannya agar sesuai sama yang ada di API
- Jika tidak, jangan tambahkan 0
*/
let formatDate = `${tahun}-${bulan < 10 ? `0${bulan}` : bulan}-${tanggal}`;

const TableJadwal = ({ city }: cityProps) => {
  return (
    <table className="border-2 border-black table-fixed">
      <thead className="border-2 border-black">
        <tr className="border-2 border-black">
          <th className="border-r-2 border-r-black text-xl px-4">Tanggal</th>
          <th className="border-r-2 border-r-black text-xl px-4">Imsak</th>
          <th className="border-r-2 border-r-black text-xl px-4">Subuh</th>
          <th className="border-r-2 border-r-black text-xl px-4">Terbit</th>
          <th className="border-r-2 border-r-black text-xl px-4">Dhuha</th>
          <th className="border-r-2 border-r-black text-xl px-4">Dzuhur</th>
          <th className="border-r-2 border-r-black text-xl px-4">Ashar</th>
          <th className="border-r-2 border-r-black text-xl px-4">Maghrib</th>
          <th className="text-xl">Isya</th>
        </tr>
      </thead>
      <tbody>
        {city.jadwal.map((waktu: any, index: number) => (
          <tr
            className={`border-b-black border-b-2 ${
              waktu.date == formatDate
                ? "bg-teal-600 text-white font-bold"
                : "odd:bg-teal-300"
            }`}
            key={index + 1}
          >
            <td className="border-r-2 font-medium border-r-black px-4 text-xl">
              {waktu.tanggal}
            </td>
            <td className="border-r-2 font-medium border-r-black px-4 text-xl">
              {waktu.imsak}
            </td>
            <td className="border-r-2 font-medium border-r-black px-4 text-xl">
              {waktu.subuh}
            </td>
            <td className="border-r-2 font-medium border-r-black px-4 text-xl">
              {waktu.terbit}
            </td>
            <td className="border-r-2 font-medium border-r-black px-4 text-xl">
              {waktu.dhuha}
            </td>
            <td className="border-r-2 font-medium border-r-black px-4 text-xl">
              {waktu.dzuhur}
            </td>
            <td className="border-r-2 font-medium border-r-black px-4 text-xl">
              {waktu.ashar}
            </td>
            <td className="border-r-2 font-medium border-r-black px-4 text-xl">
              {waktu.maghrib}
            </td>
            <td className="border-r-2 font-medium border-r-black px-4 text-xl">
              {waktu.isya}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableJadwal;
