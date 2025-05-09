"use client";

import ModalAsmaulHusna from "@/components/modal-asmaul-husna";
import SearchBar from "@/components/search-bar";
import SortByOrder from "@/components/sort-by-order";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAscending } from "@/hooks";
import { AsmaulHusnaProps } from "@/interfaces";
import { cn } from "@/lib/utils/cn";
import useGlobalStore from "@/store";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import reactStringReplace from "react-string-replace";

export default function AsmaulHusnaClient({
  asmaulHusna,
}: {
  asmaulHusna: AsmaulHusnaProps[];
}) {
  const [search, setSearch] = useQueryState("search");

  const { isAscending, setIsAscending, deferredSearch } = useAscending(
    search as string
  );

  const {
    numberModalAsmaulHusna,
    setNumberModalAsmaulHusna,
    dataAsmaulHusna,
    setDataAsmaulHusna,
  } = useGlobalStore((state) => ({
    numberModalAsmaulHusna: state.numberModalAsmaulHusna,
    setNumberModalAsmaulHusna: state.setNumberModalAsmaulHusna,
    dataAsmaulHusna: state.dataAsmaulHusna,
    setDataAsmaulHusna: state.setDataAsmaulHusna,
  }));

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
              <Card
                data-cy="card"
                role="button"
                tabIndex={0}
                key={item.urutan}
                onClick={() => {
                  setNumberModalAsmaulHusna(Number(item.urutan));
                  setDataAsmaulHusna(item);
                }}
              >
                <CardHeader className="my-3 w-full text-right">
                  <p className={cn("text-3xl font-medium", "arabic-font")}>
                    {item.arab}
                  </p>
                </CardHeader>
                <CardContent className="mt-1 text-left">
                  <h3 className="text-lg mb-1 font-bold">
                    {item.urutan}.{" "}
                    {deferredSearch
                      ? reactStringReplace(
                          item.latin,
                          deferredSearch,
                          (match: string, index: number) => (
                            <span
                              key={index + 1}
                              className="bg-lime-400 dark:bg-lime-600"
                            >
                              {match}
                            </span>
                          )
                        )
                      : item.latin}
                  </h3>
                  <p>{item.arti}</p>
                </CardContent>
              </Card>
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
      {numberModalAsmaulHusna > 0 &&
      numberModalAsmaulHusna === Number(dataAsmaulHusna.urutan) ? (
        <ModalAsmaulHusna />
      ) : null}
    </>
  );
}
