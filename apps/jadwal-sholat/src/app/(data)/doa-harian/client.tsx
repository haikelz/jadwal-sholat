"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import reactStringReplace from "react-string-replace";
import { P, match } from "ts-pattern";
import SearchBar from "~components/search-bar";
import SortByOrder from "~components/sort-by-order";
import TidakAda from "~components/tidak-ada";
import { Card, CardContent, CardHeader } from "~components/ui/card";
import { useAscending } from "~hooks";
import { DoaHarianProps } from "~interfaces";
import { cn } from "~lib/utils/cn";

export default function DoaHarianClient(
  { doaHarian }: { doaHarian: DoaHarianProps[] }
) {
  const searchParams = useSearchParams();

  const { isAscending, setIsAscending, deferredSearch } = useAscending(
    searchParams.get("search") as string
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
    [deferredSearch, doaHarian, isAscending]
  );

  return (
    <>
      <div className={cn("flex flex-col items-center justify-center")}>
        <SearchBar searchParams={searchParams} name="search" />
      </div>
      <SortByOrder isAscending={isAscending} setIsAscending={setIsAscending} />
      {match({ filteredDoaHarian: filteredDoaHarian })
        .with(
          {
            filteredDoaHarian: P.when(
              (filteredDoaHarian) => filteredDoaHarian.length
            ),
          },
          () => (
            <div
              className={cn(
                "flex justify-start items-center w-full space-y-5 flex-col text-center",
                "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              )}
            >
              {filteredDoaHarian.map((item) => (
                <Card data-cy="card" key={item.id} className="w-full">
                  <CardHeader className="text-left">
                    <h3 className="text-xl font-bold">
                      {item.id}.{" "}
                      {match({ deferredSearch: deferredSearch })
                        .with(
                          {
                            deferredSearch: P.when(
                              (deferredSearch) => deferredSearch
                            ),
                          },
                          () =>
                            reactStringReplace(
                              item.judul,
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
                        )
                        .otherwise(() => item.judul)}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p
                      className={cn(
                        "text-3xl font-medium leading-loose text-right tracking-wide my-3",
                        "arabic-font"
                      )}
                    >
                      {item.arab}
                    </p>
                    <div className="w-full text-left">
                      <p className="text-lg mb-1 text-left italic font-medium text-teal-700 dark:text-teal-300">
                        {item.latin}
                      </p>
                      <p className="font-medium">{item.terjemah}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        )
        .otherwise(() => (
          <TidakAda title="Do'a Harian" />
        ))}
    </>
  );
}
