"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useAscending } from "@/hooks";
import { AsmaulHusnaProps } from "@/interfaces";
import { SearchX } from "lucide-react";
import { AsmaulHusnaDialog, AsmaulHusnaItem } from "./dialog-asmaul-husna";
import { useQueryState } from "nuqs";
import { useMemo, useState } from "react";
import { SearchBar } from "../common/search-bar";
import { SortByOrder } from "../common/sort-by-order";

export function AsmaulHusnaPage({
  asmaulHusna,
}: {
  asmaulHusna: AsmaulHusnaProps[];
}) {
  const [search, setSearch] = useQueryState("search");
  const [selected, setSelected] = useState<AsmaulHusnaProps | null>(null);

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
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={search} setSearch={setSearch} name="search" />
        <SortByOrder
          isAscending={isAscending}
          setIsAscending={setIsAscending}
        />
      </div>
      {filteredAsmaulHusna.length ? (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredAsmaulHusna.map((item) => (
            <AsmaulHusnaItem
              dataAsmaulHusna={item}
              deferredSearch={deferredSearch}
              onSelect={setSelected}
              key={item.urutan}
            />
          ))}
        </div>
      ) : (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchX aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle data-cy="not-found-text">
              {asmaulHusna.length
                ? "Asmaul Husna yang dicari tidak ditemukan."
                : "Data Asmaul Husna belum tersedia."}
            </EmptyTitle>
            <EmptyDescription>
              Coba kata kunci lain atau tampilkan semua nama.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" onClick={() => setSearch(null)}>
              Hapus pencarian
            </Button>
          </EmptyContent>
        </Empty>
      )}
      <AsmaulHusnaDialog
        selected={selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </div>
  );
}
