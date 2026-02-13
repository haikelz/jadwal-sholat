"use client";

import { env } from "@/env.mjs";
import { useFetch } from "@/hooks";
import { PuasaSunnahProps } from "@/interfaces";
import { tahun } from "@/lib/utils/constants";
import useGlobalStore from "@/store";
import { ErrorWhileFetch } from "../react-query/error-while-fetch";
import { IsRefetching } from "../react-query/is-refetching";
import { LoadingClient } from "../react-query/loading-client";
import { TablePuasaSunnah } from "../table-puasa-sunnah";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const puasaTypesList = [
  { id: 1, name: "Puasa Senin Kamis" },
  { id: 2, name: "Puasa Ayyamul Bidh" },
  { id: 3, name: "Puasa Syawal" },
  { id: 4, name: "Puasa Tarwiyah" },
  { id: 5, name: "Puasa Arafah" },
  { id: 6, name: "Puasa Tasu'a" },
  { id: 7, name: "Puasa Asyura" },
  { id: 8, name: "Puasa Nisfu Sya'ban" },
  { id: 9, name: "Semua" },
];

const { NEXT_PUBLIC_PUASA_SUNNAH_API } = env;

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
  const { typeId, setType, selectedMonth, setSelectedMonth } = useGlobalStore(
    (state) => ({
      selectedMonth: state.selectedMonth,
      setSelectedMonth: state.setSelectedMonth,
      typeId: state.typeId,
      setType: state.setType,
    })
  );

  const { data, isPending, isError, isRefetching, refetch } = useFetch(
    typeId === 9
      ? `${NEXT_PUBLIC_PUASA_SUNNAH_API}?month=${selectedMonth}&Year=${tahun}`
      : `${NEXT_PUBLIC_PUASA_SUNNAH_API}?type_id=${typeId}
        )}&month=${selectedMonth}&Year=${tahun}`
  );

  if ((!data && isError) || isPending) return <LoadingClient />;
  if (!data.data)
    return (
      <>
        <p className="font-bold text-lg">
          Jadwal Puasa Sunnah tidak ditemukan!
        </p>
        <Button onClick={() => window.location.reload()}>Refresh</Button>
      </>
    );
  if (isError) return <ErrorWhileFetch />;
  if (isRefetching) return <IsRefetching />;

  const puasaList: PuasaSunnahProps[] = data.data;

  return (
    <div className="container mx-auto px-4">
      <div className="flex gap-4 justify-center items-center mb-8">
        <Select
          value={selectedMonth}
          onValueChange={(val: any) => {
            setSelectedMonth({ selectedMonth: val });
            refetch();
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih Bulan" />
          </SelectTrigger>
          <SelectContent>
            {listMonthInYear.map((item, index) => (
              <SelectItem key={index} value={item.id.toString()}>
                {item.month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={typeId?.toString()}
          onValueChange={(val) => {
            setType({ typeId: Number(val) });
            refetch();
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih Jenis Puasa" />
          </SelectTrigger>
          <SelectContent>
            {puasaTypesList.map((type) => (
              <SelectItem key={type.id} value={type.id.toString()}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-x-auto w-full flex justify-center items-center">
        <TablePuasaSunnah puasaList={puasaList} />
      </div>
    </div>
  );
}
