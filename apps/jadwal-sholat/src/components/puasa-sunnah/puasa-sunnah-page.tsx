"use client";

import { env } from "@/env.mjs";
import { useFetch } from "@/hooks";
import { PuasaSunnahProps } from "@/interfaces";
import { cn } from "@/lib/utils/cn";
import { bulan, matchDate, tahun } from "@/lib/utils/constants";
import useGlobalStore from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorWhileFetch } from "../react-query/error-while-fetch";
import { IsRefetching } from "../react-query/is-refetching";
import { LoadingClient } from "../react-query/loading-client";
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

interface PuasaSunnahResponse {
  success: boolean;
  message: string;
  data: PuasaSunnahProps[];
}

const { NEXT_PUBLIC_PUASA_SUNNAH_API } = env;

const listMonthInYear = [
  {
    id: 1,
    month: "Januari",
  },
  {
    id: 2,
    month: "Februari",
  },
  {
    id: 3,
    month: "Maret",
  },
  {
    id: 4,
    month: "April",
  },
  {
    id: 5,
    month: "Mei",
  },
  {
    id: 6,
    month: "Juni",
  },
  {
    id: 7,
    month: "Juli",
  },
  {
    id: 8,
    month: "Agustus",
  },
  {
    id: 9,
    month: "September",
  },
  {
    id: 10,
    month: "Oktober",
  },
  {
    id: 11,
    month: "November",
  },
  {
    id: 12,
    month: "Desember",
  },
];

export function PuasaSunnahPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>(bulan);

  const router = useRouter();

  const { typeId, setType } = useGlobalStore((state) => ({
    typeId: state.typeId,
    setType: state.setType,
  }));

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

  const puasaList = data.data;

  return (
    <div className="container mx-auto px-4">
      <div className="flex gap-4 justify-center items-center mb-8">
        <Select
          value={selectedMonth}
          onValueChange={(val: any) => {
            setSelectedMonth(val);
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
                  puasa.date === matchDate
                    ? "bg-gray-700 font-bold text-white"
                    : "odd:bg-gray-300 dark:odd:bg-gray-900"
                )}
              >
                <td className="border-r-2 border-black px-4 text-xl font-semibold dark:border-none">
                  {puasa.human_date}
                </td>
                <td className="border-r-2 border-black px-4 text-xl font-semibold dark:border-none">
                  {puasa.type.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
