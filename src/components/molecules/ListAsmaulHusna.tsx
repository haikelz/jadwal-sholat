import { cx } from "classix";
import { m } from "framer-motion";
import { useMemo, useState } from "react";
import reactStringReplace from "react-string-replace";
import { TidakAda } from "~components/atoms";
import SearchBar from "~components/molecules/SearchBar";
import { clickAnimation } from "~lib/utils/animations";
import { asmaulHusna } from "~lib/utils/asmaulHusna";
import { arab } from "~lib/utils/fonts";

export default function ListAsmaulHusna() {
  const [search, setSearch] = useState<string>("");

  const filteredAsmaulHusna = useMemo(
    () =>
      asmaulHusna.filter((item) => {
        if (search === "") return item;
        else if (item.latin.toLowerCase().includes(search.toLowerCase())) return item;
      }),
    [search]
  );

  return (
    <>
      <SearchBar setSearch={setSearch} />
      {filteredAsmaulHusna.length ? (
        <div
          className={cx(
            "grid w-full grid-cols-1 grid-rows-1 gap-5 text-center",
            "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          )}
        >
          {filteredAsmaulHusna.map((item) => (
            <m.div
              key={item.urutan}
              variants={clickAnimation}
              whileTap="whileTap"
              className={cx(
                "flex flex-col items-start justify-center",
                "overflow-hidden rounded-sm text-left",
                "border-2 border-black bg-gray-100 p-4 text-start tracking-wide",
                "cursor-pointer",
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
            </m.div>
          ))}
        </div>
      ) : (
        <TidakAda title="Asma'ul Husna" />
      )}
    </>
  );
}
