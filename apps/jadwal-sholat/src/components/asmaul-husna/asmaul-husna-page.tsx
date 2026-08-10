"use client";

import { useAscending } from "@/hooks";
import { AsmaulHusnaProps } from "@/interfaces";
import { cn } from "@/lib/utils/cn";
import dynamic from "next/dynamic";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import { SearchBar } from "../common/search-bar";
import { SortByOrder } from "../common/sort-by-order";

const DialogAsmaulHusna = dynamic(() =>
  import("./dialog-asmaul-husna").then((mod) => mod.DialogAsmaulHusna),
);

export function AsmaulHusnaPage({
  asmaulHusna,
}: {
  asmaulHusna: AsmaulHusnaProps[];
}) {
  const [search, setSearch] = useQueryState("search");

  const { isAscending, setIsAscending, deferredSearch } = useAscending(
    search as string,
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
    [deferredSearch, asmaulHusna, isAscending],
  );

  return (
    <>
      <div className="mb-7 flex w-full flex-col gap-3 rounded-xl border bg-card/50 p-3 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div className="w-full sm:max-w-md">
          <SearchBar setSearch={setSearch} name="search" />
        </div>
        <SortByOrder
          isAscending={isAscending}
          setIsAscending={setIsAscending}
        />
      </div>
      {filteredAsmaulHusna ? (
        filteredAsmaulHusna.length ? (
          <div
            className={cn(
              "grid w-full grid-cols-1 gap-4 text-center",
              "sm:grid-cols-2 xl:grid-cols-3",
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
          <p
            data-cy="not-found-text"
            className="py-12 text-center text-base text-muted-foreground"
          >
            Asmaul Husna yang dicari tidak ditemukan.
          </p>
        )
      ) : (
        <p
          data-cy="not-found-text"
          className="py-12 text-center text-base text-muted-foreground"
        >
          Data Asmaul Husna belum tersedia.
        </p>
      )}
    </>
  );
}
