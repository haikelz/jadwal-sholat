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
import { ColumnDef, useTable } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useMemo, useRef } from "react";

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

/** The nearest ancestor (up to `root`) that scrolls vertically. */
function getScrollParent(element: HTMLElement, root: HTMLElement) {
  for (let node = element.parentElement; node; node = node.parentElement) {
    const { overflowY } = getComputedStyle(node);
    if (
      (overflowY === "auto" || overflowY === "scroll") &&
      node.scrollHeight > node.clientHeight
    ) {
      return node;
    }
    if (node === root) break;
  }
  return null;
}

type JadwalRow = {
  key: string;
  isToday: boolean;
  date: string;
} & Record<PrayerKey, string>;

export function Jadwal({
  waktu,
  today,
}: {
  waktu: JadwalSholatProps[];
  /** Today as `dd-MM-yyyy`, from the caller's live clock. */
  today?: string;
}) {
  const rows = useMemo<JadwalRow[]>(
    () =>
      waktu.map((time) => ({
        key: time.date.gregorian.date,
        isToday: time.date.gregorian.date === today,
        date: format(time.date.readable, "EEEE, d LLLL yyyy", { locale: id }),
        ...(Object.fromEntries(
          prayerColumns.map((prayer) => [
            prayer.key,
            formatSholatTime(time.timings[prayer.key]),
          ]),
        ) as Record<PrayerKey, string>),
      })),
    [waktu, today],
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

  // Center today's row inside the grid's own scroll region, once per mount.
  // Setting scrollTop (not scrollIntoView) never moves the page itself.
  const containerRef = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef(false);
  useEffect(() => {
    const root = containerRef.current;
    if (!root || !today || hasScrolledRef.current) return;
    const targets = root.querySelectorAll<HTMLElement>(
      `[data-today], [data-row-id="${today}"]`,
    );
    for (const target of targets) {
      // Skip the layout hidden at this breakpoint.
      if (target.offsetParent === null) continue;
      const scroller = getScrollParent(target, root);
      if (!scroller) continue;
      const offset =
        target.getBoundingClientRect().top -
        scroller.getBoundingClientRect().top;
      scroller.scrollTop +=
        offset - (scroller.clientHeight - target.clientHeight) / 2;
      hasScrolledRef.current = true;
    }
  }, [today, rows]);

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
    <div ref={containerRef}>
      {/* ponytail: fixed-height scroll regions keep the month compact below
          today's panel; upgrade to a flex-filled height if the page layout
          ever gives this panel a bounded height. */}
      <ul className="flex max-h-120 flex-col divide-y overflow-y-auto md:hidden">
        {rows.map((row) => (
          <li
            key={row.key}
            aria-current={row.isToday ? "date" : undefined}
            data-today={row.isToday || undefined}
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
          tableLayout={{ stripped: true, headerSticky: true }}
          // The default sticky header uses the page background, which reads
          // as a dark band inside the card-colored panel. Match the panel.
          tableClassNames={{ headerSticky: "sticky top-0 z-10 bg-card" }}
        >
          <DataGridContainer>
            <DataGridScrollArea className="h-120">
              <DataGridTable />
            </DataGridScrollArea>
          </DataGridContainer>
        </DataGrid>
      </div>
    </div>
  );
}
