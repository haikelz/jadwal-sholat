"use client";

import { useAscending } from "@/hooks";
import { AsmaulHusnaProps } from "@/interfaces";
import { cn } from "@/lib/utils/cn";
import axios from "axios";
import dynamic from "next/dynamic";
import { useQueryState } from "nuqs";
import { useEffect, useMemo } from "react";
import { SearchBar } from "../common/search-bar";
import { SortByOrder } from "../common/sort-by-order";

const DialogAsmaulHusna = dynamic(() =>
  import("./dialog-asmaul-husna").then((mod) => mod.DialogAsmaulHusna)
);

export function AsmaulHusnaPage({
  asmaulHusna,
}: {
  asmaulHusna: AsmaulHusnaProps[];
}) {
  const [search, setSearch] = useQueryState("search");

  const { isAscending, setIsAscending, deferredSearch } = useAscending(
    search as string
  );

  const filteredAsmaulHusna = useMemo(
    () =>
      asmaulHusna
        .filter((item) => {
          if (deferredSearch === "" || deferredSearch === null) return item;
          else if (
            item.latin.toLowerCase().includes(deferredSearch.toLowerCase())
          )
            return item;
        })
        .sort((a, b) => {
          if (isAscending) return Number(a.urutan) - Number(b.urutan);
          if (!isAscending) return Number(b.urutan) - Number(a.urutan);
          return 0;
        }),
    [deferredSearch, asmaulHusna, isAscending]
  );

  async function A() {
    try {
      const response: { data: AsmaulHusnaProps[] } = await axios.post(
        `https://api-ahsan.shidiqcorp.id/register/customer`
      );

      console.log(response.data);
      return response.data as AsmaulHusnaProps[];
    } catch (err: any) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  useEffect(() => {
    A();
  }, []);

  return (
    <>
      <div className={cn("flex flex-col items-center justify-center mb-7")}>
        <SearchBar setSearch={setSearch} name="search" />
      </div>
      <SortByOrder isAscending={isAscending} setIsAscending={setIsAscending} />
      {filteredAsmaulHusna ? (
        filteredAsmaulHusna.length ? (
          <div
            className={cn(
              "grid w-full grid-cols-1 grid-rows-1 gap-5 text-center mt-7",
              "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            )}
          >
            {filteredAsmaulHusna.map((item) => (
              <DialogAsmaulHusna
                dataAsmaulHusna={item}
                deferredSearch={deferredSearch}
                key={item.urutan}
              />
            ))}
          </div>
        ) : (
          <p data-cy="not-found-text" className="text-lg font-medium">
            Input Asma&#39;ul Husna yang kamu masukkan tidak ditemukan!
          </p>
        )
      ) : (
        <p data-cy="not-found-text" className="text-lg font-medium">
          Tidak ada data!
        </p>
      )}
    </>
  );
}
