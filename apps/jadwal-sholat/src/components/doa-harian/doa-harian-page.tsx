"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAscending } from "@/hooks";
import { DoaHarianProps } from "@/interfaces";
import { cn } from "@/lib/utils/cn";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import reactStringReplace from "react-string-replace";
import { SearchBar } from "../common/search-bar";
import { SortByOrder } from "../common/sort-by-order";

export function DoaHarianPage({ doaHarian }: { doaHarian: DoaHarianProps[] }) {
  const [search, setSearch] = useQueryState("search");

  const { isAscending, setIsAscending, deferredSearch } = useAscending(
    search as string,
  );

  const filteredDoaHarian = useMemo(
    () =>
      doaHarian
        .filter((item) => {
          if (deferredSearch === "" || deferredSearch === null) return item;
          else if (
            item.judul.toLowerCase().includes(deferredSearch.toLowerCase())
          )
            return item;
        })
        .sort((a, b) => {
          if (isAscending) return a.id - b.id;
          if (!isAscending) return b.id - a.id;
          return 0;
        }),
    [deferredSearch, doaHarian, isAscending],
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
      {filteredDoaHarian ? (
        filteredDoaHarian.length ? (
          <div
            className={cn(
              "grid w-full grid-cols-1 items-start gap-5",
              "lg:grid-cols-2",
            )}
          >
            {filteredDoaHarian.map((item) => (
              <Card
                data-cy="card"
                key={item.id}
                className="h-full w-full rounded-xl border-border/70 shadow-xs"
              >
                <CardHeader className="px-5 pb-3 text-left sm:px-6">
                  <h3 className="text-lg font-bold sm:text-xl">
                    {item.id}.{" "}
                    {deferredSearch
                      ? reactStringReplace(
                          item.judul,
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
                      : item.judul}
                  </h3>
                </CardHeader>
                <CardContent className="px-5 pb-6 sm:px-6">
                  <p
                    lang="ar"
                    dir="rtl"
                    className={cn(
                      "my-4 text-right text-3xl font-medium leading-[2.1] tracking-wide sm:text-4xl",
                      "arabic-font",
                    )}
                  >
                    {item.arab}
                  </p>
                  <div className="w-full space-y-3 text-left">
                    <p className="text-base leading-relaxed italic font-medium text-teal-700 dark:text-teal-300">
                      {item.latin}
                    </p>
                    <p className="max-w-prose leading-relaxed text-muted-foreground">
                      {item.terjemah}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p
            data-cy="not-found-text"
            className="py-12 text-center text-base text-muted-foreground"
          >
            Doa yang dicari tidak ditemukan.
          </p>
        )
      ) : (
        <p
          data-cy="not-found-text"
          className="py-12 text-center text-base text-muted-foreground"
        >
          Data doa belum tersedia.
        </p>
      )}
    </>
  );
}
