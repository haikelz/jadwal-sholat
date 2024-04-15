"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import reactStringReplace from "react-string-replace";
import { P, match } from "ts-pattern";
import { TidakAda } from "~components/atoms";
import { ListSuratProps } from "~interfaces";
import { cx, removeSelectedSurat } from "~lib/helpers";
import useGlobalStore from "~store";

export function ListSurat(
  {
    surat,
    deferredSearch,
    isAscending,
  }: {
    surat: ListSuratProps;
    deferredSearch: string;
    isAscending: boolean;
  }
) {
  const { setLastRead } = useGlobalStore((state) => ({
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
        .sort(() => {
          if (isAscending) return 1;
          if (!isAscending) return -1;
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
      {match({ filteredSurat: filteredSurat })
        .with(
          { filteredSurat: P.when((filteredSurat) => filteredSurat.length) },
          () => (
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
                    data-cy="card"
                    className={cx(
                      "flex flex-col rounded-md",
                      "border-2 border-black bg-gray-100",
                      "p-4 text-left ",
                      "dark:border-gray-200 dark:bg-[#2A2A37] dark:text-white"
                    )}
                  >
                    <p className="text-right font-semibold tracking-wide">
                      {surat.type.id}
                    </p>
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
                  </div>
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
