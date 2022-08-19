import { Waktu } from "src/interfaces";
import { matchDate } from "src/utils/date";

const TableJadwalSholat = ({ waktu }: Waktu) => {
  return (
    <table className="border-2 border-black  dark:border-none table-fixed">
      <thead className="border-2 border-black dark:border-none ">
        <tr className="border-2 border-black dark:border-none ">
          <th className="border-r-2 border-r-black dark:border-none text-xl px-4">
            Tanggal
          </th>
          <th className="border-r-2 border-r-black dark:border-none text-xl px-4">
            Imsak
          </th>
          <th className="border-r-2 border-r-black dark:border-none text-xl px-4">
            Subuh
          </th>
          <th className="border-r-2 border-r-black dark:border-none text-xl px-4">
            Terbit
          </th>
          <th className="border-r-2 border-r-black dark:border-none text-xl px-4">
            Dhuha
          </th>
          <th className="border-r-2 border-r-black dark:border-none text-xl px-4">
            Dzuhur
          </th>
          <th className="border-r-2 border-r-black dark:border-none text-xl px-4">
            Ashar
          </th>
          <th className="border-r-2 border-r-black dark:border-none text-xl px-4">
            Maghrib
          </th>
          <th className="text-xl">Isya</th>
        </tr>
      </thead>
      <tbody>
        {waktu.jadwal.map((waktu, index: number) => (
          <tr
            className={`border-black dark:border-none border-b-2 ${
              waktu.date === matchDate
                ? "dark:bg-teal-700 bg-teal-600 text-white font-bold"
                : "dark:odd:bg-gray-800 odd:bg-teal-300"
            }`}
            key={index + 1}
          >
            <td className="border-r-2 font-medium border-black dark:border-none px-4 text-xl">
              {waktu.tanggal}
            </td>
            <td className="border-r-2 font-medium border-black dark:border-none px-4 text-xl">
              {waktu.imsak}
            </td>
            <td className="border-r-2 font-medium border-black dark:border-none px-4 text-xl">
              {waktu.subuh}
            </td>
            <td className="border-r-2 font-medium border-black dark:border-none px-4 text-xl">
              {waktu.terbit}
            </td>
            <td className="border-r-2 font-medium border-black dark:border-none px-4 text-xl">
              {waktu.dhuha}
            </td>
            <td className="border-r-2 font-medium border-black dark:border-none px-4 text-xl">
              {waktu.dzuhur}
            </td>
            <td className="border-r-2 font-medium border-black dark:border-none px-4 text-xl">
              {waktu.ashar}
            </td>
            <td className="border-r-2 font-medium border-black dark:border-none px-4 text-xl">
              {waktu.maghrib}
            </td>
            <td className="border-r-2 font-medium border-black dark:border-none px-4 text-xl">
              {waktu.isya}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableJadwalSholat;
