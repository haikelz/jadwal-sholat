"use client";

import cx from "classix";
import Link from "next/link";
import { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { SortByOrder } from "~components/atoms";
import { SearchBar } from "~components/molecules";
import { ListSurat } from "~components/organisms";
import { useAscending } from "~hooks";
import { ListSuratProps } from "~interfaces";
import useGlobalStore from "~store";

export default function QuranClient({ surat }: { surat: ListSuratProps }) {
  const [search, setSearch] = useState<string>("");

  const { isAscending, setIsAscending, deferredSearch } = useAscending(search);

  const { lastRead } = useGlobalStore((state) => ({
    lastRead: state.lastRead,
  }));

  return (
    <>
      <div
        className={cx(
          "flex flex-col items-center justify-center",
          "text-center ",
          "dark:text-white"
        )}
      >
        <SearchBar search={search} setSearch={setSearch} />
        <p className="mt-2 text-lg font-medium">
          Terakhir dibaca:{" "}
          {lastRead.ayat || lastRead.number !== null ? (
            <Link
              href={`/quran/surat/${lastRead.number}`}
              onClick={() =>
                secureLocalStorage.setItem(
                  "selected-surat",
                  lastRead.number?.toString() as string
                )
              }
            >
              <span
                className={cx(
                  "hover-animation underline-animation  font-bold",
                  "hover:text-red-500",
                  "dark:text-white dark:hover:text-blue-500"
                )}
              >
                Surat {lastRead.name} ayat {lastRead.ayat}
              </span>
            </Link>
          ) : (
            "belum ada"
          )}
        </p>
      </div>
      <SortByOrder isAscending={isAscending} setIsAscending={setIsAscending} />
      <ListSurat
        surat={surat}
        deferredSearch={deferredSearch}
        isAscending={isAscending}
      />
    </>
  );
}
