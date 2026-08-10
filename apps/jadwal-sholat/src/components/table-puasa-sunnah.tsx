import { PuasaSunnahScheduleDate } from "@/interfaces";
import { formatToIndonesianDate } from "@/lib/helpers/format-to-indonesian-date";
import { cn } from "@/lib/utils/cn";
import { currentDateWithDayOfWeek } from "@/lib/utils/constants";

export function TablePuasaSunnah({
  puasaList,
}: {
  puasaList: PuasaSunnahScheduleDate[];
}) {
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-card shadow-xs">
      <table className="w-full table-fixed text-left">
        <caption className="sr-only">Jadwal puasa sunnah</caption>
        <colgroup>
          <col className="w-[42%] sm:w-[38%]" />
          <col />
        </colgroup>
        <thead className="bg-muted/70">
          <tr>
            <th
              scope="col"
              className="border-b px-3 py-3 text-sm font-semibold sm:px-5 sm:text-base"
            >
              Tanggal
            </th>
            <th
              scope="col"
              className="border-b px-3 py-3 text-sm font-semibold sm:px-5 sm:text-base"
            >
              Jenis Puasa
            </th>
          </tr>
        </thead>
        <tbody>
          {puasaList.map((puasa) => (
            <tr
              key={puasa.date}
              className={cn(
                "border-b last:border-0",
                formatToIndonesianDate(puasa.date) === currentDateWithDayOfWeek
                  ? "bg-primary font-semibold text-primary-foreground"
                  : "even:bg-muted/35",
              )}
            >
              <th
                scope="row"
                className="px-3 py-4 align-top text-sm font-semibold leading-relaxed sm:px-5 sm:text-base"
              >
                {formatToIndonesianDate(puasa.date)}
              </th>
              <td className="px-3 py-4 align-top text-sm leading-relaxed sm:px-5 sm:text-base">
                {puasa.recommendations
                  .map((recommendation) => recommendation.name)
                  .join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
