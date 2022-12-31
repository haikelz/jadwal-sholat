import SearchBar from "@/atoms/searchBar";
import TidakAda from "@/atoms/tidakAda";
import { asmaulHusna } from "@/utils/data";
import clsx from "clsx";
import { memo, useMemo, useState } from "react";
import reactStringReplace from "react-string-replace";

const ListAsmaulHusna = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAsmaulHusna = useMemo(
    () =>
      asmaulHusna.filter((value) => {
        if (searchTerm === "") {
          return value;
        } else if (value.latin.toLowerCase().includes(searchTerm.toLowerCase())) {
          return value;
        }
      }),
    [searchTerm]
  );

  return (
    <>
      <SearchBar setSearchTerm={setSearchTerm} />
      {filteredAsmaulHusna.length ? (
        <div
          className={clsx(
            "grid w-full grid-cols-1 grid-rows-1 gap-5 text-center",
            "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          )}
        >
          {filteredAsmaulHusna.map((item) => (
            <div
              key={item.urutan}
              className={clsx(
                "flex flex-col items-start justify-center overflow-hidden rounded-sm",
                "border-2 border-black bg-gray-100 p-4 text-start tracking-wide transition-all ease-in-out",
                "active:scale-95 dark:border-white dark:bg-[#2A2A37]"
              )}
            >
              <h3 className="text-xl font-bold">{item.urutan}</h3>
              <div className="my-3 w-full text-right">
                <p className="font-arab text-3xl font-bold">{item.arab}</p>
              </div>
              <p className="text-lg font-medium">
                {searchTerm
                  ? reactStringReplace(item.latin, searchTerm, (match: string, index: number) => (
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
};

export default memo(ListAsmaulHusna);
