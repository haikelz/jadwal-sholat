"use client";

import { cx } from "classix";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import secureLocalStorage from "react-secure-storage";
import reactStringReplace from "react-string-replace";
import { TidakAda } from "~components/atoms";
import { SearchBar } from "~components/molecules";
import { ListSuratProps } from "~interfaces";
import { removeSelectedSurat } from "~lib/helpers";
import useGlobalStore from "~store";

export function ListSurat({ surat }: { surat: ListSuratProps }) {
  const [search, setSearch] = useState<string>("");
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const { lastRead, setLastRead } = useGlobalStore((state) => ({
    lastRead: state.lastRead,
    setLastRead: state.setLastRead,
  }));

  const filteredSurat = useMemo(
    () =>
      surat.data
        .filter((value) => {
          if (search === "") return value;
          else if (value.asma.id.short.toLowerCase().includes(search.toLowerCase())) return value;
        })
        .sort(() => {
          if (isAscending) return 1;
          if (!isAscending) return -1;
          return 0;
        }),
    [surat, search, isAscending]
  );

  useEffect(() => {
    if (secureLocalStorage.getItem("surat") as string) {
      setLastRead(JSON.parse(secureLocalStorage.getItem("surat") as string));
    }
  }, [setLastRead]);

  return (
    <>
      <div
        className={cx(
          "flex flex-col items-center justify-center",
          "text-center text-black",
          "dark:text-white"
        )}
      >
        <SearchBar setSearch={setSearch} />
        <p className="mt-2 text-lg font-medium">
          Terakhir dibaca:{" "}
          {lastRead.ayat || lastRead.number !== null ? (
            <Link
              href={`/quran/surat/${lastRead.number}`}
              onClick={() =>
                secureLocalStorage.setItem("selected-surat", lastRead.number?.toString() as string)
              }
            >
              <span
                className={cx(
                  "hover-animation underline-animation text-black",
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
      <div className="w-full flex justify-end items-center">
        <div
          className={cx(
            "flex px-2 py-1 justify-center text-black rounded-md",
            "dark:text-white items-center bg-gray-200 dark:bg-gray-800"
          )}
        >
          <span className="font-normal">Sort By: </span>
          <button
            type="button"
            aria-label="sort"
            onClick={() => setIsAscending(!isAscending)}
            className="flex space-x-1 ml-2 justify-center items-center"
          >
            <span className="font-semibold">{isAscending ? "Ascending" : "Descending"}</span>
            {isAscending ? <MdArrowUpward /> : <MdArrowDownward />}
          </button>
        </div>
      </div>
      {filteredSurat.length ? (
        <div
          className={cx(
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
              <div
                id="card"
                className={cx(
                  "flex flex-col rounded-md",
                  "border-2 border-black bg-gray-100",
                  "p-4 text-left text-black",
                  "dark:border-gray-200 dark:bg-[#2A2A37] dark:text-white"
                )}
              >
                <p className="text-right font-semibold tracking-wide">{surat.type.id}</p>
                <span className="text-xl font-bold">{surat.number}</span>
                <p className="text-lg font-bold">
                  {search
                    ? reactStringReplace(
                        surat.asma.id.short,
                        search,
                        (match: string, index: number) => (
                          <span key={index + 1} className="bg-lime-400 dark:bg-lime-600">
                            {match}
                          </span>
                        )
                      )
                    : surat.asma.id.short}
                </p>
                <p className="font-medium">{surat.asma.translation.id}</p>
                <p className="mt-0.5">Jumlah: {surat.ayahCount} ayat</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <TidakAda title="surat" />
      )}
    </>
  );
}
