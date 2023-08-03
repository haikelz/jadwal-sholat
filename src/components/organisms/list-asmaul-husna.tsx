"use client";

import { cx } from "classix";
import { useMemo, useState } from "react";
import reactStringReplace from "react-string-replace";
import { TidakAda } from "~components/atoms";
import { SearchBar } from "~components/molecules";
import { arab } from "~lib/utils/fonts";
import { AsmaulHusnaProps } from "~models";

export function ListAsmaulHusna({ asmaulHusna }: AsmaulHusnaProps) {
  const [search, setSearch] = useState<string>("");

  const filteredAsmaulHusna = useMemo(
    () =>
      asmaulHusna.filter((item) => {
        if (search === "") return item;
        else if (item.latin.toLowerCase().includes(search.toLowerCase())) return item;
      }),
    [search, asmaulHusna]
  );

  return (
    <>
      <div className={cx("flex flex-col items-center justify-center")}>
        <SearchBar setSearch={setSearch} />
      </div>
      {filteredAsmaulHusna.length ? (
        <div
          className={cx(
            "grid w-full grid-cols-1 grid-rows-1 gap-5 text-center",
            "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          )}
        >
          {filteredAsmaulHusna.map((item) => (
            <div
              key={item.urutan}
              className={cx(
                "flex flex-col items-start justify-center",
                "overflow-hidden rounded-sm text-left",
                "border-2 border-black bg-gray-100 p-4",
                "text-start tracking-wide cursor-pointer",
                "transition-all",
                "hover:bg-white",
                "dark:border-white dark:bg-[#2A2A37]"
              )}
            >
              <h3 className="text-xl font-bold">{item.urutan}</h3>
              <div className="my-3 w-full text-right">
                <p className={cx("text-3xl font-medium", arab.className)}>{item.arab}</p>
              </div>
              <p className="text-lg font-medium">
                {search
                  ? reactStringReplace(item.latin, search, (match: string, index: number) => (
                      <span key={index + 1} className="bg-lime-400 dark:bg-lime-600">
                        {match}
                      </span>
                    ))
                  : item.latin}
              </p>
              <p>{item.arti}</p>
            </div>
          ))}
        </div>
      ) : (
        <TidakAda title="Asma'ul Husna" />
      )}
    </>
  );
}
