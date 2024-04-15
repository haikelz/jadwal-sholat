"use client";

import { useMemo } from "react";
import reactStringReplace from "react-string-replace";
import { P, match } from "ts-pattern";
import { TidakAda } from "~components/atoms";
import { DoaHarianProps } from "~interfaces";
import { cx } from "~lib/helpers";

export function ListDoaHarian(
  {
    doaHarian,
    deferredSearch,
    isAscending,
  }: {
    doaHarian: DoaHarianProps[];
    deferredSearch: string;
    isAscending: boolean;
  }
) {
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
        .sort(() => {
          if (isAscending) return 1;
          if (!isAscending) return -1;
          return 0;
        }),
    [deferredSearch, doaHarian, isAscending]
  );

  return (
    <>
      {match({ filteredDoaHarian: filteredDoaHarian })
        .with(
          {
            filteredDoaHarian: P.when(
              (filteredDoaHarian) => filteredDoaHarian.length
            ),
          },
          () => (
            <div
              className={cx(
                "flex justify-start items-center w-full space-y-5 flex-col text-center",
                "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              )}
            >
              {filteredDoaHarian.map((item) => (
                <div
                  data-cy="card"
                  key={item.id}
                  className={cx(
                    "flex flex-col w-full items-start justify-center",
                    "overflow-hidden rounded-md text-left",
                    "border-2 border-black bg-gray-100 p-4",
                    "text-start tracking-wide",
                    "dark:border-white dark:bg-[#2A2A37]"
                  )}
                >
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
                  <div className="my-3 w-full text-right">
                    <p
                      className={cx(
                        "text-3xl font-medium leading-loose tracking-wide",
                        "arabic-font"
                      )}
                    >
                      {item.arab}
                    </p>
                  </div>
                  <p className="text-lg mb-1 text-left italic font-medium text-teal-700 dark:text-teal-300">
                    {item.latin}
                  </p>
                  <p className="font-medium">{item.terjemah}</p>
                </div>
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
