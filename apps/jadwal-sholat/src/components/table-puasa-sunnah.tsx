import { PuasaSunnahProps } from "@/interfaces";
import { formatToIndonesianDate } from "@/lib/helpers/format-to-indonesian-date";
import { cn } from "@/lib/utils/cn";
import { currentDateWithDayOfWeek } from "@/lib/utils/constants";

export function TablePuasaSunnah({
  puasaList,
}: {
  puasaList: PuasaSunnahProps[];
}) {
  return (
    <table className="w-full md:w-1/2 border-2 border-black dark:border-none">
      <thead className="border-2 border-black dark:border-none">
        <tr className="border-2 border-black dark:border-none">
          <th className="border-r-2 border-r-black px-4 text-xl dark:border-none">
            Tanggal
          </th>
          <th className="border-r-2 border-r-black px-4 text-xl dark:border-none">
            Jenis Puasa
          </th>
        </tr>
      </thead>
      <tbody>
        {puasaList.map((puasa: PuasaSunnahProps) => (
          <tr
            key={puasa.id}
            className={cn(
              "border-b-2 border-black dark:border-none",
              formatToIndonesianDate(puasa.human_date) ===
                currentDateWithDayOfWeek
                ? "bg-gray-700 font-bold text-white"
                : "odd:bg-gray-300 dark:odd:bg-gray-900"
            )}
          >
            <td className="border-r-2 border-black px-4 text-xl font-semibold dark:border-none">
              {formatToIndonesianDate(puasa.human_date)}
            </td>
            <td className="border-r-2 border-black px-4 text-xl font-semibold dark:border-none">
              {puasa.type.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
