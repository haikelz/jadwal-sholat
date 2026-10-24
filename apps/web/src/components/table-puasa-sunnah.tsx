import { Badge } from "@/components/reui/badge";
import {
  DataGrid,
  DataGridContainer,
  dataGridFeatures,
  type DataGridFeatures,
} from "@/components/reui/data-grid/data-grid";
import { DataGridScrollArea } from "@/components/reui/data-grid/data-grid-scroll-area";
import { DataGridTable } from "@/components/reui/data-grid/data-grid-table";
import type { PuasaSunnahScheduleDate } from "@/interfaces";
import { formatToIndonesianDate } from "@/lib/helpers/format-to-indonesian-date";
import { cn } from "@/lib/utils/cn";
import { type ColumnDef, useTable } from "@tanstack/react-table";
import { useMemo } from "react";

export function TablePuasaSunnah({
  puasaList,
  today,
  todayIso,
}: {
  puasaList: PuasaSunnahScheduleDate[];
  /** Today as "EEEE, d MMMM yyyy" (Indonesian), from the caller's live clock. */
  today?: string;
  /** Today as yyyy-MM-dd; earlier dates are dimmed as already past. */
  todayIso?: string;
}) {
  const columns = useMemo<
    ColumnDef<DataGridFeatures, PuasaSunnahScheduleDate>[]
  >(
    () => [
      {
        id: "date",
        accessorKey: "date",
        header: "Tanggal",
        cell: ({ row }) => {
          const date = formatToIndonesianDate(row.original.date);
          const isPast =
            todayIso !== undefined && row.original.date.slice(0, 10) < todayIso;
          return (
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn("font-medium", isPast && "text-muted-foreground")}
              >
                {date}
              </span>
              {date === today ? (
                <Badge variant="primary-light">Hari ini</Badge>
              ) : null}
            </div>
          );
        },
        size: 260,
      },
      {
        id: "recommendations",
        header: "Jenis puasa",
        cell: ({ row }) => (
          <div
            className={cn(
              "flex flex-wrap gap-1",
              // Past fasts recede so the upcoming ones stand out.
              todayIso !== undefined &&
                row.original.date.slice(0, 10) < todayIso &&
                "opacity-60",
            )}
          >
            {row.original.recommendations.map((recommendation) => (
              <Badge key={recommendation.key} variant="outline">
                {recommendation.name}
              </Badge>
            ))}
          </div>
        ),
        size: 420,
      },
    ],
    [today, todayIso],
  );

  const table = useTable({
    features: dataGridFeatures,
    columns,
    data: puasaList,
    getRowId: (row: PuasaSunnahScheduleDate) => row.date,
  });

  return (
    <DataGrid
      table={table}
      recordCount={puasaList.length}
      tableLayout={{ stripped: true, width: "auto" }}
    >
      <DataGridContainer>
        <DataGridScrollArea>
          <DataGridTable />
        </DataGridScrollArea>
      </DataGridContainer>
    </DataGrid>
  );
}
