"use client";

import { P, match } from "ts-pattern";
import ErrorWhileFetch from "~components/error-while-fetch";
import LoadingClient from "~components/loading-client";
import { env } from "~env.mjs";
import { useFetch } from "~hooks";
import { WaktuProps } from "~interfaces";
import { cn } from "~lib/utils/cn";
import { bulan, currentDate, matchDate, tahun } from "~lib/utils/constants";
import { bitter } from "~lib/utils/fonts";

const { NEXT_PUBLIC_JADWAL_SHOLAT_API } = env;

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

export default function Client({ id }: { id: string }) {
  const formatDate: string = `${tahun}/${bulan}`;

  const { data, isPending, isError } = useFetch(
    match({ id: id })
      .with(
        { id: P.when((id) => id) },
        () => `${NEXT_PUBLIC_JADWAL_SHOLAT_API}/jadwal/${id}/${formatDate}`
      )
      .otherwise(() => "")
  );

  if ((!data && isError) || isPending) return <LoadingClient />;
  if (isError || typeof data.data === "undefined") return <ErrorWhileFetch />;

  const waktu = data.data as WaktuProps;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1
          className={cn(
            "text-3xl font-bold tracking-wide sm:text-4xl",
            bitter.className
          )}
        >
          {waktu.lokasi}
        </h1>
        <p className="text-lg font-medium">
          PROVINSI {waktu.daerah}, {currentDate.toUpperCase()}
        </p>
      </div>
      <div className="flex w-full items-center overflow-x-auto text-center lg:justify-center">
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
                  className={cn(
                    "border-b-2 border-black dark:border-none",
                    waktu.date === matchDate
                      ? "bg-teal-600 font-bold text-white dark:bg-gray-700"
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
      </div>
    </>
  );
}
