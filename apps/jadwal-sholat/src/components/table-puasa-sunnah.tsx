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
import { PuasaSunnahScheduleDate } from "@/interfaces";
import { formatToIndonesianDate } from "@/lib/helpers/format-to-indonesian-date";
import { currentDateWithDayOfWeek } from "@/lib/utils/constants";
import { ColumnDef, useTable } from "@tanstack/react-table";
import { useMemo } from "react";

export function TablePuasaSunnah({
  puasaList,
}: {
  puasaList: PuasaSunnahScheduleDate[];
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
          return (
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">{date}</span>
              {date === currentDateWithDayOfWeek ? (
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
          <div className="flex flex-wrap gap-1">
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
    [],
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
