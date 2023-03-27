import { matchDate } from "~lib/helpers/formatDate";
import { WaktuProps } from "~models";

const tableJadwalSholatList = [
  { name: "Tanggal" },
  { name: "Imsak" },
  { name: "Subuh" },
  { name: "Terbit" },
  { name: "Dhuha" },
  { name: "Dzuhur" },
  { name: "Ashar" },
  { name: "Maghrib" },
];

export default function TableJadwalSholat({ waktu }: WaktuProps) {
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
        {waktu.jadwal.map((waktu, index) => {
          const dataTable = [
            { waktu: waktu.tanggal },
            { waktu: waktu.imsak },
            { waktu: waktu.subuh },
            { waktu: waktu.terbit },
            { waktu: waktu.dhuha },
            { waktu: waktu.dzuhur },
            { waktu: waktu.ashar },
            { waktu: waktu.maghrib },
            { waktu: waktu.isya },
          ];
          return (
            <tr
              className={`border-b-2 border-black dark:border-none ${
                waktu.date === matchDate
                  ? "bg-teal-600 font-bold text-white dark:bg-teal-700"
                  : "odd:bg-teal-300 dark:odd:bg-gray-800"
              }`}
              key={index + 1}
            >
              {dataTable.map((item, index) => (
                <td
                  key={index + 1}
                  className="border-r-2 border-black px-4 text-xl font-medium dark:border-none"
                >
                  {item.waktu}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
