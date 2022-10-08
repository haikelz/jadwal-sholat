import { Waktu } from "@/src/interfaces";
import { tableJadwalSholatList } from "@/src/utils/data";
import { matchDate } from "@/src/utils/date";

const TableJadwalSholat = ({ waktu }: Waktu) => {
  return (
    <table className="table-fixed border-2 border-black dark:border-none">
      <thead className="border-2 border-black dark:border-none">
        <tr className="border-2 border-black dark:border-none">
          {tableJadwalSholatList.map((item, index) => (
            <th key={index + 1} className="border-r-2 border-r-black px-4 text-xl dark:border-none">
              {item.name}
            </th>
          ))}
          <th className="text-xl">Isya</th>
        </tr>
      </thead>
      <tbody>
        {waktu.jadwal.map((waktu, index) => (
          <tr
            className={`border-b-2 border-black dark:border-none ${
              waktu.date === matchDate
                ? "bg-teal-600 font-bold text-white dark:bg-teal-700"
                : "odd:bg-teal-300 dark:odd:bg-gray-800"
            }`}
            key={index + 1}
          >
            <td className="border-r-2 border-black px-4 text-xl font-medium dark:border-none">
              {waktu.tanggal}
            </td>
            <td className="border-r-2 border-black px-4 text-xl font-medium dark:border-none">
              {waktu.imsak}
            </td>
            <td className="border-r-2 border-black px-4 text-xl font-medium dark:border-none">
              {waktu.subuh}
            </td>
            <td className="border-r-2 border-black px-4 text-xl font-medium dark:border-none">
              {waktu.terbit}
            </td>
            <td className="border-r-2 border-black px-4 text-xl font-medium dark:border-none">
              {waktu.dhuha}
            </td>
            <td className="border-r-2 border-black px-4 text-xl font-medium dark:border-none">
              {waktu.dzuhur}
            </td>
            <td className="border-r-2 border-black px-4 text-xl font-medium dark:border-none">
              {waktu.ashar}
            </td>
            <td className="border-r-2 border-black px-4 text-xl font-medium dark:border-none">
              {waktu.maghrib}
            </td>
            <td className="border-r-2 border-black px-4 text-xl font-medium dark:border-none">
              {waktu.isya}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableJadwalSholat;
