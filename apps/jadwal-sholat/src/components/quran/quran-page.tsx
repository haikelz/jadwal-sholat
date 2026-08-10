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
    search as string,
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
    [surat, deferredSearch, isAscending],
  );

  useEffect(() => {
    if (localStorage.getItem("surat") as string) {
      setLastRead(JSON.parse(localStorage.getItem("surat") as string));
    }
  }, [setLastRead]);

  return (
    <>
      <div className="mb-7 grid w-full items-center gap-3 rounded-xl border bg-card/50 p-3 shadow-xs sm:p-4 lg:grid-cols-[minmax(16rem,1fr)_auto_auto]">
        <div className="w-full lg:max-w-md">
          <SearchBar setSearch={setSearch} name="search" />
        </div>
        <div className="flex min-h-10 min-w-0 items-center rounded-lg bg-muted/60 px-3 py-2 text-sm text-muted-foreground">
          <span className="me-1 shrink-0">Terakhir dibaca:</span>
          {lastRead.ayat || lastRead.number !== null ? (
            <Link
              href={`/quran/${lastRead.number}`}
              onClick={() =>
                localStorage.setItem(
                  "selected-surat",
                  lastRead.number!.toString() as string,
                )
              }
              className="min-w-0 truncate rounded-sm font-semibold text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Surat {lastRead.name} ayat {lastRead.ayat}
            </Link>
          ) : (
            <span className="font-medium text-foreground">belum ada</span>
          )}
        </div>
        <div className="flex justify-end">
          <SortByOrder
            isAscending={isAscending}
            setIsAscending={setIsAscending}
          />
        </div>
      </div>
      {filteredSurat ? (
        filteredSurat.length ? (
          <div
            className={cn(
              "grid w-full grid-cols-1 gap-4",
              "sm:grid-cols-2",
              "xl:grid-cols-3",
            )}
          >
            {filteredSurat.map((surat) => (
              <Link
                key={surat.number}
                href={`/quran/${surat.number}`}
                onClick={removeSelectedSurat}
                className="h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <Card
                  data-cy="card"
                  className="h-full rounded-xl border-border/70 shadow-xs transition-[background-color,border-color,box-shadow,transform] hover:border-border hover:bg-muted/30 hover:shadow-sm active:scale-[0.96]"
                >
                  <CardHeader className="pb-2">
                    <p className="text-right text-sm font-medium tracking-wide text-muted-foreground">
                      {surat.type.id}
                    </p>
                  </CardHeader>
                  <CardContent className="text-left">
                    <p className="my-1 text-xl font-bold">
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
                            ),
                          )
                        : surat.asma.id.short}
                    </p>
                    <p className="mb-2 font-medium">
                      {surat.asma.translation.id}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {surat.ayahCount} ayat
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p
            data-cy="not-found-text"
            className="py-12 text-center text-base text-muted-foreground"
          >
            Surat yang dicari tidak ditemukan.
          </p>
        )
      ) : (
        <p
          data-cy="not-found-text"
          className="py-12 text-center text-base text-muted-foreground"
        >
          Data surat belum tersedia.
        </p>
      )}
    </>
  );
}
