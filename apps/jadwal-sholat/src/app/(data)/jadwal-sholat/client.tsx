"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import reactStringReplace from "react-string-replace";
import { P, match } from "ts-pattern";
import SearchBar from "~components/search-bar";
import SortByOrder from "~components/sort-by-order";
import TidakAda from "~components/tidak-ada";
import { Card } from "~components/ui/card";
import { useAscending } from "~hooks";
import { KotaProps } from "~interfaces";
import { cn } from "~lib/utils/cn";

export default function JadwalSholatClient({ kota }: { kota: KotaProps }) {
  const searchParams = useSearchParams();

  const { isAscending, setIsAscending, deferredSearch } = useAscending(
    searchParams.get("search") as string
  );

  /**
   * - Di API nya, ada satu kota yang mempunyai dua id yang berbeda(3211 dan 3212), jadi dia munculnya 2 kali di listKota nya.
   * - Hal ini menjadi masalah karena hanya satu id yang valid, yakni 3211.
   * - Untuk 3212 tidak valid, karena sebenarnya itu tidak ada.
   * - Nah makanya disini kita coba memfilter id-nya agar kota yang memiliki id 3212 tidak ikutan masuk
   */
  const filteredKota = useMemo(
    () =>
      kota.data
        .filter((item) => {
          if (deferredSearch === "" || deferredSearch === null) {
            return item.id !== "3212";
          } else if (
            item.lokasi.toLowerCase().includes(deferredSearch.toLowerCase())
          ) {
            return item.id !== "3212";
          }
        })
        .sort(() => {
          if (isAscending) return 1;
          if (!isAscending) return -1;
          return 0;
        }),
    [kota, deferredSearch, isAscending]
  );

  return (
    <>
      <div className={cn("flex flex-col items-center justify-center")}>
        <SearchBar searchParams={searchParams} name="search" />
      </div>
      <SortByOrder isAscending={isAscending} setIsAscending={setIsAscending} />
      {match({ filteredKota: filteredKota })
        .with(
          { filteredKota: P.when((filteredKota) => filteredKota.length) },
          () => (
            <div
              className={cn(
                "grid w-full grid-cols-1 grid-rows-1 gap-5 text-center",
                "sm:grid-cols-2",
                "lg:grid-cols-3",
                "xl:grid-cols-4"
              )}
            >
              {filteredKota.map((loc) => (
                <Link href={`/jadwal-sholat/kota/${loc.id}`} key={loc.id}>
                  <Card
                    data-cy="card"
                    className={cn(
                      "flex h-full items-center justify-center",
                      "py-6 px-10"
                    )}
                  >
                    <p className="text-xl font-bold">
                      {match({ deferredSearch: deferredSearch })
                        .with(
                          {
                            deferredSearch: P.when(
                              (deferredSearch) => deferredSearch
                            ),
                          },
                          () =>
                            reactStringReplace(
                              loc.lokasi,
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
                        .otherwise(() => loc.lokasi)}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          )
        )
        .otherwise(() => (
          <TidakAda title="Kota" />
        ))}
    </>
  );
}
