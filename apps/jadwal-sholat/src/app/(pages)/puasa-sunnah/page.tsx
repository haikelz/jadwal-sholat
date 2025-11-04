"use client";

import { ErrorWhileFetch } from "@/components/react-query/error-while-fetch";
import { IsRefetching } from "@/components/react-query/is-refetching";
import { LoadingClient } from "@/components/react-query/loading-client";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PuasaSunnah } from "@/interfaces";
import { cn } from "@/lib/utils/cn";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

const PUASA_SUNNAH_API =
  "https://api.puasa-sunnah.granitebps.com/api/v1/fastings";

const PUASA_TYPES = [
  { id: 1, name: "Puasa Senin Kamis" },
  { id: 2, name: "Puasa Ayyamul Bidh" },
  { id: 6, name: "Puasa Tasu'a" },
  { id: 7, name: "Puasa Asyura" },
];

interface PuasaSunnahResponse {
  success: boolean;
  message: string;
  data: PuasaSunnah[];
}

export default function PuasaSunnahPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedType, setSelectedType] = useState<string>("1");

  const { data, isPending, isError, isRefetching } = useQuery({
    queryKey: ["puasa-sunnah"],
    queryFn: () => fetch(PUASA_SUNNAH_API).then((res) => res.json()),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  }) as { data: PuasaSunnahResponse | undefined } & {
    isPending: boolean;
    isError: boolean;
    isRefetching: boolean;
  };

  if ((!data && isError) || isPending) return <LoadingClient />;
  if (isError || !data?.data) return <ErrorWhileFetch />;
  if (isRefetching) return <IsRefetching />;

  const puasaList = data.data;

  return (
    <div className="container mx-auto px-4">
      <div className="flex mb-4 flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <h1 className={cn("text-3xl font-bold tracking-wide sm:text-4xl")}>
            Jadwal Puasa Sunnahfd
          </h1>
          <Image
            src="/img/mosque.webp"
            width={40}
            height={40}
            alt="Mosque"
            fetchPriority="high"
            draggable={false}
          />
        </div>
        <p className="mt-2 text-lg font-medium text-center">
          Berikut Jadwal Puasa Sunnah berdasarkan tanggal dan jenis puasa yang
          dipilih
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
        <div className="w-full md:w-auto">
          <DatePicker date={date} setDate={setDate} />
        </div>
        <div className="w-full md:w-[200px]">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Jenis Puasa" />
            </SelectTrigger>
            <SelectContent>
              {PUASA_TYPES.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-2 border-black dark:border-none">
          <thead className="border-2 border-black dark:border-none">
            <tr className="border-2 border-black dark:border-none">
              <th className="border-r-2 border-r-black px-4 text-xl dark:border-none">
                Tanggal
              </th>
              <th className="border-r-2 border-r-black px-4 text-xl dark:border-none">
                Jenis Puasa
              </th>
              <th className="px-4 text-xl">Kategori</th>
            </tr>
          </thead>
          <tbody>
            {puasaList.map((puasa: PuasaSunnah) => (
              <tr
                key={puasa.id}
                className="odd:bg-gray-300 dark:odd:bg-gray-900 border-b-2 border-black dark:border-none"
                style={{
                  backgroundColor: puasa.type.background_color,
                  color: puasa.type.text_color,
                }}
              >
                <td className="border-r-2 border-black px-4 text-xl font-semibold dark:border-none">
                  {puasa.human_date}
                </td>
                <td className="border-r-2 border-black px-4 text-xl font-semibold dark:border-none">
                  {puasa.type.name}
                </td>
                <td className="px-4 text-xl font-semibold">
                  {puasa.category.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
