"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks";
import { PuasaSunnahScheduleResponse, PuasaSunnahTypeKey } from "@/interfaces";
import { tahun } from "@/lib/utils/constants";
import useGlobalStore from "@/store";
import { ErrorWhileFetch } from "../react-query/error-while-fetch";
import { IsRefetching } from "../react-query/is-refetching";
import { LoadingClient } from "../react-query/loading-client";
import { TablePuasaSunnah } from "../table-puasa-sunnah";

const puasaTypesList = [
  { key: "all", name: "Semua" },
  { key: "monday_thursday", name: "Puasa Senin dan Kamis" },
  { key: "white_days", name: "Puasa Ayyamul Bidh" },
  { key: "six_shawwal_candidate", name: "Enam hari puasa Syawal" },
  { key: "ashura", name: "Puasa Asyura dan hari pendamping" },
  {
    key: "first_nine_dhul_hijjah",
    name: "Sembilan hari pertama Zulhijah",
  },
  { key: "arafah", name: "Puasa Arafah" },
] as const;

const listMonthInYear = [
  {
    id: "01",
    month: "Januari",
  },
  {
    id: "02",
    month: "Februari",
  },
  {
    id: "03",
    month: "Maret",
  },
  {
    id: "04",
    month: "April",
  },
  {
    id: "05",
    month: "Mei",
  },
  {
    id: "06",
    month: "Juni",
  },
  {
    id: "07",
    month: "Juli",
  },
  {
    id: "08",
    month: "Agustus",
  },
  {
    id: "09",
    month: "September",
  },
  {
    id: "10",
    month: "Oktober",
  },
  {
    id: "11",
    month: "November",
  },
  {
    id: "12",
    month: "Desember",
  },
];

export function PuasaSunnahPage() {
  const { selectedType, setSelectedType, selectedMonth, setSelectedMonth } =
    useGlobalStore((state) => ({
      selectedMonth: state.selectedMonth,
      setSelectedMonth: state.setSelectedMonth,
      selectedType: state.selectedType,
      setSelectedType: state.setSelectedType,
    }));

  const { data, isPending, isError, isRefetching } =
    useFetch<PuasaSunnahScheduleResponse>(
      `/api/puasa-sunnah?period=month&date=${tahun}-${selectedMonth}-01`,
    );

  if (isPending) return <LoadingClient />;
  if (isError) return <ErrorWhileFetch />;
  if (!data?.data)
    return (
      <>
        <p className="text-lg font-bold">
          Jadwal puasa sunnah tidak ditemukan.
        </p>
        <Button onClick={() => window.location.reload()}>Muat ulang</Button>
      </>
    );
  if (isRefetching) return <IsRefetching />;

  const puasaList = data.data.dates
    .filter(
      (puasa) =>
        selectedType === "all" ||
        puasa.recommendations.some(
          (recommendation) => recommendation.key === selectedType,
        ),
    )
    .map((puasa) => ({
      ...puasa,
      recommendations:
        selectedType === "all"
          ? puasa.recommendations
          : puasa.recommendations.filter(
              (recommendation) => recommendation.key === selectedType,
            ),
    }));

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6 grid gap-4 rounded-xl border bg-card p-4 shadow-xs sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:p-5">
        <div className="min-w-0 space-y-2 text-left">
          <span className="text-sm font-semibold">Bulan</span>
          <Select
            value={selectedMonth}
            onValueChange={(val) => {
              setSelectedMonth({ selectedMonth: val });
            }}
          >
            <SelectTrigger aria-label="Pilih bulan" className="w-full">
              <SelectValue placeholder="Pilih bulan" />
            </SelectTrigger>
            <SelectContent>
              {listMonthInYear.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="min-w-0 space-y-2 text-left">
          <span className="text-sm font-semibold">Jenis puasa</span>
          <Select
            value={selectedType}
            onValueChange={(val) => {
              setSelectedType({
                selectedType: val as PuasaSunnahTypeKey | "all",
              });
            }}
          >
            <SelectTrigger aria-label="Pilih jenis puasa" className="w-full">
              <SelectValue placeholder="Pilih jenis puasa" />
            </SelectTrigger>
            <SelectContent>
              {puasaTypesList.map((type) => (
                <SelectItem key={type.key} value={type.key}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full">
        {puasaList.length > 0 ? (
          <TablePuasaSunnah puasaList={puasaList} />
        ) : (
          <p className="text-center text-lg font-semibold">
            Tidak ada jadwal untuk jenis puasa yang dipilih pada bulan ini.
          </p>
        )}
      </div>
    </div>
  );
}
