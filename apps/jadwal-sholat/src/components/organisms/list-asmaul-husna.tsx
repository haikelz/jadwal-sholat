"use client";

import { X } from "lucide-react";
import { useMemo } from "react";
import reactStringReplace from "react-string-replace";
import { P, match } from "ts-pattern";
import { TidakAda } from "~components/atoms";
import { AsmaulHusnaProps } from "~interfaces";
import { cx } from "~lib/helpers";
import useGlobalStore from "~store";

export function ListAsmaulHusna(
  {
    asmaulHusna,
    deferredSearch,
    isAscending,
  }: {
    asmaulHusna: AsmaulHusnaProps[];
    deferredSearch: string;
    isAscending: boolean;
  }
) {
  const {
    numberModalAsmaulHusna,
    setNumberModalAsmaulHusna,
    dataAsmaulHusna,
    setDataAsmaulHusna,
  } = useGlobalStore((state) => ({
    numberModalAsmaulHusna: state.numberModalAsmaulHusna,
    setNumberModalAsmaulHusna: state.setNumberModalAsmaulHusna,
    dataAsmaulHusna: state.dataAsmaulHusna,
    setDataAsmaulHusna: state.setDataAsmaulHusna,
  }));

  const filteredAsmaulHusna = useMemo(
    () =>
      asmaulHusna
        .filter((item) => {
          if (deferredSearch === "" || deferredSearch === null) return item;
          else if (
            item.latin.toLowerCase().includes(deferredSearch.toLowerCase())
          )
            return item;
        })
        .sort(() => {
          if (isAscending) return 1;
          if (!isAscending) return -1;
          return 0;
        }),
    [deferredSearch, asmaulHusna, isAscending]
  );

  return (
    <>
      {match({ filteredAsmaulHusna: filteredAsmaulHusna })
        .with(
          {
            filteredAsmaulHusna: P.when(
              (filteredAsmaulHusna) => filteredAsmaulHusna.length
            ),
          },
          () => (
            <div
              className={cx(
                "grid w-full grid-cols-1 grid-rows-1 gap-5 text-center mt-7",
                "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              )}
            >
              {filteredAsmaulHusna.map((item) => (
                <div
                  data-cy="card"
                  role="button"
                  tabIndex={0}
                  key={item.urutan}
                  className={cx(
                    "flex flex-col w-full items-start justify-center cursor-pointer",
                    "overflow-hidden rounded-md text-left",
                    "border-2 border-black bg-gray-100 p-4",
                    "text-start tracking-wide",
                    "dark:border-white dark:bg-[#2A2A37]"
                  )}
                  onClick={() => {
                    setNumberModalAsmaulHusna(Number(item.urutan));
                    setDataAsmaulHusna(item);
                  }}
                >
                  <div className="my-3 w-full text-right">
                    <p className={cx("text-3xl font-medium", "arabic-font")}>
                      {item.arab}
                    </p>
                  </div>
                  <h3 className="text-lg my-1 font-bold">
                    {item.urutan}.{" "}
                    {match({ deferredSearch: deferredSearch })
                      .with(
                        {
                          deferredSearch: P.when(
                            (deferredSearch) => deferredSearch
                          ),
                        },
                        () =>
                          reactStringReplace(
                            item.latin,
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
                      .otherwise(() => item.latin)}
                  </h3>
                  <p>{item.arti}</p>
                </div>
              ))}
            </div>
          )
        )
        .otherwise(() => (
          <TidakAda title="Asma'ul Husna" />
        ))}
      {match({ numberModalAsmaulHusna: numberModalAsmaulHusna })
        .with(
          {
            numberModalAsmaulHusna: P.when(
              (numberModalAsmaulHusna) =>
                numberModalAsmaulHusna > 0 &&
                numberModalAsmaulHusna === Number(dataAsmaulHusna.urutan)
            ),
          },
          () => (
            <div
              aria-modal="true"
              className={cx(
                "modal-blur fixed inset-0 top-0 z-50",
                "flex min-h-screen w-full items-center justify-center",
                "overflow-x-hidden"
              )}
            >
              <div className="relative w-full max-w-2xl p-4 md:h-auto">
                <div
                  className={cx(
                    "relative rounded-lg bg-white shadow",
                    "dark:bg-gray-800 dark:text-white"
                  )}
                >
                  <div className="flex items-center justify-between rounded-t border-b p-4">
                    <span className="text-xl font-semibold">
                      {dataAsmaulHusna.urutan}. {dataAsmaulHusna.latin}
                    </span>
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        type="button"
                        className={cx(
                          "ml-auto inline-flex items-center rounded-lg",
                          "bg-transparent p-1.5 text-sm transition-all",
                          "hover:bg-gray-200",
                          "dark:text-white dark:hover:text-gray-900"
                        )}
                        aria-label="close modal asmaul husna"
                        onClick={() => setNumberModalAsmaulHusna(0)}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-6 p-6">
                    <h3 className="text-3xl arabic-font">
                      {dataAsmaulHusna.arab}
                    </h3>
                    <p className="text-base leading-relaxed">
                      {dataAsmaulHusna.arti}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        )
        .otherwise(() => null)}
    </>
  );
}
