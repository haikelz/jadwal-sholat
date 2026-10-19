"use client";

import { Badge } from "@/components/reui/badge";
import {
  DataGrid,
  DataGridContainer,
  dataGridFeatures,
  type DataGridFeatures,
} from "@/components/reui/data-grid/data-grid";
import { DataGridScrollArea } from "@/components/reui/data-grid/data-grid-scroll-area";
import { DataGridTable } from "@/components/reui/data-grid/data-grid-table";
import { JadwalSholatProps } from "@/interfaces";
import { formatSholatTime } from "@/lib/helpers";
import { matchDate } from "@/lib/utils/constants";
import { ColumnDef, useTable } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useMemo } from "react";

const prayerColumns = [
  { key: "Imsak", name: "Imsak" },
  { key: "Fajr", name: "Subuh" },
  { key: "Sunrise", name: "Terbit" },
  { key: "Dhuhr", name: "Dzuhur" },
  { key: "Asr", name: "Ashar" },
  { key: "Sunset", name: "Terbenam" },
  { key: "Maghrib", name: "Maghrib" },
  { key: "Isha", name: "Isya" },
] as const;

type PrayerKey = (typeof prayerColumns)[number]["key"];

type JadwalRow = {
  key: string;
  isToday: boolean;
  date: string;
} & Record<PrayerKey, string>;

export function Jadwal({ waktu }: { waktu: JadwalSholatProps[] }) {
  const rows = useMemo<JadwalRow[]>(
    () =>
      waktu.map((time) => ({
        key: time.date.gregorian.date,
        isToday: time.date.gregorian.date === matchDate,
        date: format(time.date.readable, "EEEE, d LLLL yyyy", { locale: id }),
        ...(Object.fromEntries(
          prayerColumns.map((prayer) => [
            prayer.key,
            formatSholatTime(time.timings[prayer.key]),
          ]),
        ) as Record<PrayerKey, string>),
      })),
    [waktu],
  );

  const columns = useMemo<ColumnDef<DataGridFeatures, JadwalRow>[]>(
    () => [
      {
        accessorKey: "date",
        id: "date",
        header: "Tanggal",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">
              {row.original.date}
            </span>
            {row.original.isToday ? (
              <Badge variant="primary-light">Hari ini</Badge>
            ) : null}
          </div>
        ),
        size: 260,
      },
      ...prayerColumns.map<ColumnDef<DataGridFeatures, JadwalRow>>(
        (prayer) => ({
          accessorKey: prayer.key,
          id: prayer.key,
          header: prayer.name,
          cell: (info) => (
            <span className="tabular-nums">{info.getValue() as string}</span>
          ),
          size: 90,
        }),
      ),
    ],
    [],
  );

  const table = useTable({
    features: dataGridFeatures,
    columns,
    data: rows,
    getRowId: (row: JadwalRow) => row.key,
    state: {
      // ponytail: one month fits on one page, so paging stays off.
      pagination: { pageIndex: 0, pageSize: Math.max(rows.length, 1) },
    },
  });

  return (
    <>
      <ul className="flex flex-col divide-y md:hidden">
        {rows.map((row) => (
          <li
            key={row.key}
            aria-current={row.isToday ? "date" : undefined}
            className="flex flex-col gap-3 p-4"
          >
            <div className="flex items-center gap-2">
              <h3 className="min-w-0 truncate text-sm font-medium">
                {row.date}
              </h3>
              {row.isToday ? (
                <Badge variant="primary-light">Hari ini</Badge>
              ) : null}
            </div>
            <dl className="grid grid-cols-4 gap-x-3 gap-y-3">
              {prayerColumns.map((prayer) => (
                <div key={prayer.key} className="flex min-w-0 flex-col gap-0.5">
                  <dt className="truncate text-xs text-muted-foreground">
                    {prayer.name}
                  </dt>
                  <dd className="text-sm font-semibold tabular-nums">
                    {row[prayer.key]}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <div className="hidden w-full md:block">
        <DataGrid
          table={table}
          recordCount={rows.length}
          emptyMessage="Jadwal bulan ini belum tersedia."
          tableLayout={{ stripped: true, rowRounded: true }}
        >
          <DataGridContainer>
            <DataGridScrollArea>
              <DataGridTable />
            </DataGridScrollArea>
          </DataGridContainer>
        </DataGrid>
      </div>
    </>
  );
}
