"use client";

import { SearchBar } from "@/components/common/search-bar";
import { SortByOrder } from "@/components/common/sort-by-order";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAscending } from "@/hooks";
import { ListSuratProps } from "@/interfaces";
import { removeSelectedSurat } from "@/lib/helpers";
import { cn } from "@/lib/utils/cn";
import useGlobalStore from "@/store";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useEffect, useMemo } from "react";
import reactStringReplace from "react-string-replace";

export function QuranPage({ surat }: { surat: ListSuratProps }) {
  const [search, setSearch] = useQueryState("search");

  const { isAscending, setIsAscending, deferredSearch } = useAscending(
    search as string
  );

  const { lastRead, setLastRead } = useGlobalStore((state) => ({
    lastRead: state.lastRead,
    setLastRead: state.setLastRead,
  }));

  const filteredSurat = useMemo(
    () =>
      surat.data
        .filter((item) => {
          if (deferredSearch === "" || deferredSearch === null) return item;
          else if (
            item.asma.id.short
              .toLowerCase()
              .includes(deferredSearch.toLowerCase())
          )
            return item;
        })
        .sort((a, b) => {
          if (isAscending) return Number(a.number) - Number(b.number);
          if (!isAscending) return Number(b.number) - Number(a.number);
          return 0;
        }),
    [surat, deferredSearch, isAscending]
  );

  useEffect(() => {
    if (localStorage.getItem("surat") as string) {
      setLastRead(JSON.parse(localStorage.getItem("surat") as string));
    }
  }, [setLastRead]);

  return (
    <>
      <div
        className={cn(
          "flex flex-col items-center justify-center",
          "text-center ",
          "dark:text-white"
        )}
      >
        <SearchBar setSearch={setSearch} name="search" />
        <p className="mt-2 text-lg font-medium">
          Terakhir dibaca:{" "}
          {lastRead.ayat || lastRead.number !== null ? (
            <Link
              href={`/quran/${lastRead.number}`}
              onClick={() =>
                localStorage.setItem(
                  "selected-surat",
                  lastRead.number!.toString() as string
                )
              }
              className={cn("font-bold", "dark:text-white hover:underline")}
            >
              <span>
                Surat {lastRead.name} ayat {lastRead.ayat}
              </span>
            </Link>
          ) : (
            "belum ada"
          )}
        </p>
      </div>
      <SortByOrder isAscending={isAscending} setIsAscending={setIsAscending} />
      {filteredSurat ? (
        filteredSurat ? (
          <div
            className={cn(
              "grid w-full grid-cols-1 grid-rows-1 gap-4",
              "sm:grid-cols-2",
              "lg:grid-cols-3",
              "xl:grid-cols-4"
            )}
          >
            {filteredSurat.map((surat) => (
              <Link
                key={surat.number}
                href={`/quran/${surat.number}`}
                onClick={removeSelectedSurat}
              >
                <Card data-cy="card">
                  <CardHeader>
                    <p className="text-right font-semibold tracking-wide">
                      {surat.type.id}
                    </p>
                  </CardHeader>
                  <CardContent className="text-left">
                    <p className="text-lg font-bold my-1">
                      {surat.number}.{" "}
                      {deferredSearch
                        ? reactStringReplace(
                            surat.asma.id.short,
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
                        : surat.asma.id.short}
                    </p>
                    <p className="font-medium mb-1">
                      {surat.asma.translation.id}
                    </p>
                    <p>Jumlah: {surat.ayahCount} ayat</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p data-cy="not-found-text" className="text-lg font-medium">
            Input Surat yang kamu masukkan tidak ditemukan!
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
