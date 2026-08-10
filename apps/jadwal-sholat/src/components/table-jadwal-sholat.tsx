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
  const rows = waktu.map((time) => ({
    isToday: time.date.gregorian.date === matchDate,
    key: time.date.gregorian.date,
    date: format(time.date.readable, "EEEE, d LLLL yyyy", { locale: id }),
    prayers: [
      { name: "Imsak", time: formatSholatTime(time.timings.Imsak) },
      { name: "Subuh", time: formatSholatTime(time.timings.Fajr) },
      { name: "Terbit", time: formatSholatTime(time.timings.Sunrise) },
      { name: "Dzuhur", time: formatSholatTime(time.timings.Dhuhr) },
      { name: "Ashar", time: formatSholatTime(time.timings.Asr) },
      { name: "Terbenam", time: formatSholatTime(time.timings.Sunset) },
      { name: "Maghrib", time: formatSholatTime(time.timings.Maghrib) },
      { name: "Isya", time: formatSholatTime(time.timings.Isha) },
    ],
  }));

  return (
    <>
      <div className="grid w-full gap-3 md:hidden">
        {rows.map((row) => (
          <article
            key={row.key}
            className={cn(
              "rounded-xl border p-4 text-left shadow-xs",
              row.isToday
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-card text-card-foreground",
            )}
          >
            <h2 className="text-base font-semibold">{row.date}</h2>
            <dl className="mt-4 grid grid-cols-4 gap-x-3 gap-y-4">
              {row.prayers.map((prayer) => (
                <div key={prayer.name} className="min-w-0">
                  <dt
                    className={cn(
                      "truncate text-xs",
                      row.isToday
                        ? "text-primary-foreground/75"
                        : "text-muted-foreground",
                    )}
                  >
                    {prayer.name}
                  </dt>
                  <dd className="mt-1 text-sm font-bold tabular-nums">
                    {prayer.time}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
      <div className="hidden w-full overflow-x-auto rounded-xl border bg-card shadow-xs md:block">
        <table className="w-full min-w-[860px] border-collapse text-left">
          <caption className="sr-only">Jadwal sholat bulan ini</caption>
          <thead className="bg-muted/70">
            <tr>
              {tableJadwalSholatList.map((item) => (
                <th
                  key={item.id}
                  scope="col"
                  className="whitespace-nowrap border-b px-3 py-3 text-sm font-semibold"
                >
                  {item.name}
                </th>
              ))}
              <th
                scope="col"
                className="whitespace-nowrap border-b px-3 py-3 text-sm font-semibold"
              >
                Isya
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                className={cn(
                  "border-b last:border-0",
                  row.isToday
                    ? "bg-primary text-primary-foreground"
                    : "even:bg-muted/35",
                )}
                key={row.key}
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-3 py-3 text-sm font-semibold"
                >
                  {row.date}
                </th>
                {row.prayers.map((prayer) => (
                  <td
                    key={prayer.name}
                    className="px-3 py-3 text-sm font-medium tabular-nums"
                  >
                    {prayer.time}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
