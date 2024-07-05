"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import reactStringReplace from "react-string-replace";
import { P, match } from "ts-pattern";
import SearchBar from "~components/search-bar";
import SortByOrder from "~components/sort-by-order";
import TidakAda from "~components/tidak-ada";
import { Card, CardContent, CardHeader } from "~components/ui/card";
import { useAscending } from "~hooks";
import { ListSuratProps } from "~interfaces";
import { removeSelectedSurat } from "~lib/helpers";
import { cn } from "~lib/utils/cn";
import useGlobalStore from "~store";

export default function QuranClient({ surat }: { surat: ListSuratProps }) {
  const searchParams = useSearchParams();

  const { isAscending, setIsAscending, deferredSearch } = useAscending(
    searchParams.get("search") as string
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
        <SearchBar searchParams={searchParams} name="search" />
        <p className="mt-2 text-lg font-medium">
          Terakhir dibaca:{" "}
          {match({ lastRead: lastRead })
            .with(
              {
                lastRead: P.when(
                  () => lastRead.ayat || lastRead.number !== null
                ),
              },
              () => (
                <Link
                  href={`/quran/surat/${lastRead.number}`}
                  onClick={() =>
                    localStorage.setItem(
                      "selected-surat",
                      lastRead.number!.toString() as string
                    )
                  }
                >
                  <span
                    className={cn(
                      "hover-animation underline-animation font-bold",
                      "hover:text-red-500",
                      "dark:text-white dark:hover:text-blue-500"
                    )}
                  >
                    Surat {lastRead.name} ayat {lastRead.ayat}
                  </span>
                </Link>
              )
            )
            .otherwise(() => "belum ada")}
        </p>
      </div>
      <SortByOrder isAscending={isAscending} setIsAscending={setIsAscending} />
      {match({ filteredSurat: filteredSurat })
        .with(
          { filteredSurat: P.when((filteredSurat) => filteredSurat.length) },
          () => (
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
                  href={`/quran/surat/${surat.number}`}
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
                        {match({ deferredSearch: deferredSearch })
                          .with(
                            {
                              deferredSearch: P.when(
                                (deferredSearch) => deferredSearch
                              ),
                            },
                            () =>
                              reactStringReplace(
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
                          )
                          .otherwise(() => surat.asma.id.short)}
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
          )
        )
        .otherwise(() => (
          <TidakAda title="surat" />
        ))}
    </>
  );
}
