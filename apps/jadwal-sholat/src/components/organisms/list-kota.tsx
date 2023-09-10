"use client";

import { cx } from "classix";
import Link from "next/link";
import { useMemo, useState } from "react";
import reactStringReplace from "react-string-replace";
import { TidakAda } from "~components/atoms";
import { SearchBar } from "~components/molecules";
import { KotaProps } from "~interfaces";

export function ListKota({ kota }: { kota: KotaProps[] }) {
  const [search, setSearch] = useState<string>("");

  /**
   * - Di API nya, ada satu kota yang mempunyai dua id yang berbeda(3211 dan 3212), jadi dia munculnya 2 kali di listKota nya.
   * - Hal ini menjadi masalah karena hanya satu id yang valid, yakni 3211.
   * - Untuk 3212 tidak valid, karena sebenarnya itu tidak ada.
   * - Nah makanya disini kita coba memfilter id-nya agar kota yang memiliki id 3212 tidak ikutan masuk
   */
  const filteredKota = useMemo(
    () =>
      kota.filter((value) => {
        if (search === "") {
          return value.id !== "3212";
        } else if (value.lokasi.toLowerCase().includes(search.toLowerCase())) {
          return value.id !== "3212";
        }
      }),
    [kota, search]
  );

  return (
    <>
      <div className={cx("flex flex-col items-center justify-center")}>
        <SearchBar setSearch={setSearch} />
      </div>
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
                id="card"
                className={cx(
                  "flex h-full items-center justify-center",
                  "overflow-hidden rounded-md text-black",
                  "border-2 border-black bg-gray-100 py-6 px-10",
                  "dark:border-white dark:bg-[#2A2A37] dark:text-white"
                )}
              >
                <p className="text-xl font-bold">
                  {search
                    ? reactStringReplace(loc.lokasi, search, (match: string, index: number) => (
                        <span key={index + 1} className="bg-lime-400 dark:bg-lime-600">
                          {match}
                        </span>
                      ))
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
