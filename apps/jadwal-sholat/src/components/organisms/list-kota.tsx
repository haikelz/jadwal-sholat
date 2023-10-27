"use client";

import { cx } from "classix";
import Link from "next/link";
import { useMemo, useState } from "react";
import reactStringReplace from "react-string-replace";
import { SortByOrder, TidakAda } from "~components/atoms";
import { SearchBar } from "~components/molecules";
import { useAscending } from "~hooks";
import { KotaProps } from "~interfaces";

export function ListKota({ kota }: { kota: KotaProps[] }): JSX.Element {
  const [search, setSearch] = useState<string>("");

  const { isAscending, setIsAscending, deferredSearch } = useAscending(search);

  /**
   * - Di API nya, ada satu kota yang mempunyai dua id yang berbeda(3211 dan 3212), jadi dia munculnya 2 kali di listKota nya.
   * - Hal ini menjadi masalah karena hanya satu id yang valid, yakni 3211.
   * - Untuk 3212 tidak valid, karena sebenarnya itu tidak ada.
   * - Nah makanya disini kita coba memfilter id-nya agar kota yang memiliki id 3212 tidak ikutan masuk
   */
  const filteredKota = useMemo(
    () =>
      kota
        .filter((value) => {
          if (deferredSearch === "") {
            return value.id !== "3212";
          } else if (
            value.lokasi.toLowerCase().includes(deferredSearch.toLowerCase())
          ) {
            return value.id !== "3212";
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
      <div className={cx("flex flex-col items-center justify-center")}>
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <SortByOrder isAscending={isAscending} setIsAscending={setIsAscending} />
      {filteredKota.length ? (
        <div
          className={cx(
            "grid w-full grid-cols-1 grid-rows-1 gap-5 text-center",
            "sm:grid-cols-2",
            "lg:grid-cols-3",
            "xl:grid-cols-4"
          )}
        >
          {filteredKota.map((loc) => (
            <Link href={`/jadwal-sholat/kota/${loc.id}`} key={loc.id}>
              <div
                data-cy="card"
                className={cx(
                  "flex h-full items-center justify-center",
                  "overflow-hidden rounded-md ",
                  "border-2 border-black bg-gray-100 py-6 px-10",
                  "dark:border-white dark:bg-[#2A2A37] dark:text-white"
                )}
              >
                <p className="text-xl font-bold">
                  {deferredSearch
                    ? reactStringReplace(
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
                    : loc.lokasi}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <TidakAda title="Kota" />
      )}
    </>
  );
}
