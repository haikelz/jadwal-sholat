import { JadwalSholatProps } from "@/interfaces";
import { formatSholatTime } from "@/lib/helpers";
import { cn } from "@/lib/utils/cn";
import { matchDate } from "@/lib/utils/constants";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const tableJadwalSholatList = [
  { id: 1, name: "Tanggal" },
  { id: 2, name: "Imsak" },
  { id: 3, name: "Subuh" },
  { id: 4, name: "Terbit" },
  { id: 5, name: "Dzuhur" },
  { id: 6, name: "Ashar" },
  { id: 7, name: "Terbenam" },
  { id: 8, name: "Maghrib" },
];

export function Jadwal({ waktu }: { waktu: JadwalSholatProps[] }) {
  return (
    <table className="table-fixed border-2 border-black dark:border-none">
      <thead className="border-2 border-black dark:border-none">
        <tr className="border-2 border-black dark:border-none">
          {tableJadwalSholatList.map((item) => (
            <th
              key={item.id}
              className={cn(
                "border-r-2 border-r-black px-4",
                "px-4 text-xl",
                "dark:border-none"
              )}
            >
              {item.name}
            </th>
          ))}
          <th className="text-xl">Isya</th>
        </tr>
      </thead>
      <tbody>
        {waktu.map((time, index) => {
          const dataTable = [
            {
              id: 1,
              waktu: format(time.date.readable, "EEEE, d LLLL yyyy", {
                locale: id,
              }),
            },
            { id: 2, waktu: formatSholatTime(time.timings.Imsak) },
            { id: 3, waktu: formatSholatTime(time.timings.Fajr) },
            {
              id: 4,
              waktu: formatSholatTime(time.timings.Sunrise),
            },
            { id: 5, waktu: formatSholatTime(time.timings.Dhuhr) },
            { id: 6, waktu: formatSholatTime(time.timings.Asr) },
            { id: 7, waktu: formatSholatTime(time.timings.Sunset) },
            {
              id: 8,
              waktu: formatSholatTime(time.timings.Maghrib),
            },
            { id: 9, waktu: formatSholatTime(time.timings.Isha) },
          ];
          return (
            <tr
              className={cn(
                "border-b-2 border-black dark:border-none",
                time.date.gregorian.date === matchDate
                  ? "bg-gray-700 font-bold text-white"
                  : "odd:bg-gray-300 dark:odd:bg-gray-900"
              )}
              key={index + 1}
            >
              {dataTable.map((item) => (
                <td
                  key={item.id}
                  className="border-r-2 border-black px-4 text-xl font-semibold dark:border-none"
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
