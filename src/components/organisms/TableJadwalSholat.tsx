import { cx } from "classix";
import { matchDate } from "~lib/utils/constants";
import { WaktuProps } from "~models";

const tableJadwalSholatList = [
  { id: 1, name: "Tanggal" },
  { id: 2, name: "Imsak" },
  { id: 3, name: "Subuh" },
  { id: 4, name: "Terbit" },
  { id: 5, name: "Dhuha" },
  { id: 6, name: "Dzuhur" },
  { id: 7, name: "Ashar" },
  { id: 8, name: "Maghrib" },
];

export default function TableJadwalSholat({ waktu }: WaktuProps) {
  return (
    <table className="table-fixed border-2 border-black dark:border-none">
      <thead className="border-2 border-black dark:border-none">
        <tr className="border-2 border-black dark:border-none">
          {tableJadwalSholatList.map((item) => (
            <th
              key={item.id}
              className={cx("border-r-2 border-r-black", "px-4 text-xl", "dark:border-none")}
            >
              {item.name}
            </th>
          ))}
          <th className="text-xl">Isya</th>
        </tr>
      </thead>
      <tbody>
        {waktu.jadwal.map((waktu, index) => {
          const dataTable = [
            { id: 1, waktu: waktu.tanggal },
            { id: 2, waktu: waktu.imsak },
            { id: 3, waktu: waktu.subuh },
            { id: 4, waktu: waktu.terbit },
            { id: 5, waktu: waktu.dhuha },
            { id: 6, waktu: waktu.dzuhur },
            { id: 7, waktu: waktu.ashar },
            { id: 8, waktu: waktu.maghrib },
            { id: 9, waktu: waktu.isya },
          ];
          return (
            <tr
              className={cx(
                "border-b-2 border-black dark:border-none",
                waktu.date === matchDate
                  ? "bg-teal-600 font-bold text-white dark:bg-teal-700"
                  : "odd:bg-teal-300 dark:odd:bg-gray-800"
              )}
              key={index + 1}
            >
              {dataTable.map((item) => (
                <td
                  key={item.id}
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
