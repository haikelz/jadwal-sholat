"use client";

import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import reactStringReplace from "react-string-replace";
import { P, match } from "ts-pattern";
import SearchBar from "~components/search-bar";
import SortByOrder from "~components/sort-by-order";
import TidakAda from "~components/tidak-ada";
import { Card, CardContent, CardHeader } from "~components/ui/card";
import { useAscending } from "~hooks";
import { AsmaulHusnaProps } from "~interfaces";
import { cn } from "~lib/utils/cn";
import useGlobalStore from "~store";

export default function AsmaulHusnaClient(
  { asmaulHusna }: { asmaulHusna: AsmaulHusnaProps[] }
) {
  const searchParams = useSearchParams();

  const { isAscending, setIsAscending, deferredSearch } = useAscending(
    searchParams.get("search") as string
  );

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
        .sort((a, b) => {
          if (isAscending) return Number(a.urutan) - Number(b.urutan);
          if (!isAscending) return Number(b.urutan) - Number(a.urutan);
          return 0;
        }),
    [deferredSearch, asmaulHusna, isAscending]
  );

  return (
    <>
      <div className={cn("flex flex-col items-center justify-center mb-7")}>
        <SearchBar searchParams={searchParams} name="search" />
      </div>
      <SortByOrder isAscending={isAscending} setIsAscending={setIsAscending} />
      {match({ filteredAsmaulHusna: filteredAsmaulHusna })
        .with(
          {
            filteredAsmaulHusna: P.when(
              (filteredAsmaulHusna) => filteredAsmaulHusna.length
            ),
          },
          () => (
            <div
              className={cn(
                "grid w-full grid-cols-1 grid-rows-1 gap-5 text-center mt-7",
                "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              )}
            >
              {filteredAsmaulHusna.map((item) => (
                <Card
                  data-cy="card"
                  role="button"
                  tabIndex={0}
                  key={item.urutan}
                  onClick={() => {
                    setNumberModalAsmaulHusna(Number(item.urutan));
                    setDataAsmaulHusna(item);
                  }}
                >
                  <CardHeader className="my-3 w-full text-right">
                    <p className={cn("text-3xl font-medium", "arabic-font")}>
                      {item.arab}
                    </p>
                  </CardHeader>
                  <CardContent className="mt-1 text-left">
                    <h3 className="text-lg mb-1 font-bold">
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
                  </CardContent>
                </Card>
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
              className={cn(
                "modal-blur fixed inset-0 top-0 z-50",
                "flex min-h-screen w-full items-center justify-center",
                "overflow-x-hidden"
              )}
            >
              <div className="relative w-full max-w-2xl p-4 md:h-auto">
                <div
                  className={cn(
                    "relative rounded-lg bg-white",
                    "dark:bg-gray-950 border border-input dark:text-white"
                  )}
                >
                  <div className="flex items-center justify-between rounded-t border-b border-b-input p-4">
                    <span className="text-xl font-semibold">
                      {dataAsmaulHusna.urutan}. {dataAsmaulHusna.latin}
                    </span>
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        type="button"
                        className={cn(
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
