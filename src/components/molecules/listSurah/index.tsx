import { DaftarSurah } from "@/src/interfaces";
import { memo, useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/atoms/searchBar";
import TidakAda from "@/components/atoms/tidakAda";
import reactStringReplace from "react-string-replace";

const ListSurah = ({ surah }: DaftarSurah) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSurah = surah.filter((value) => {
    if (searchTerm === "") {
      return value;
    } else if (
      value.asma.id.short.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return value;
    }
  });

  return (
    <>
      <SearchBar setSearchTerm={setSearchTerm} />
      {filteredSurah.length ? (
        <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 grid-rows-1 gap-4 w-full">
          {filteredSurah.map((surat, index: number) => (
            <Link href={`/quran/surah/${surat.number}`} key={index + 1}>
              <div className="flex flex-col text-left border-2 border-black cursor-pointer p-4 rounded-sm bg-teal-300 dark:bg-[#2A2A37] dark:border-white">
                <p className="text-right font-semibold tracking-wide">
                  {surat.type.id}
                </p>
                <h1 className="font-bold text-xl">{surat.number}</h1>
                <p className="font-bold text-lg">
                  {searchTerm
                    ? reactStringReplace(
                        surat.asma.id.short,
                        searchTerm,
                        (match: string, index: number) => (
                          <span
                            key={index++}
                            className="bg-lime-400 dark:bg-lime-600"
                          >
                            {match}
                          </span>
                        )
                      )
                    : surat.asma.id.short}
                </p>
                <p className="font-medium">{surat.asma.translation.id}</p>
                <p>Jumlah: {surat.ayahCount} ayat</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <TidakAda title="Surah" />
      )}
    </>
  );
};

export default memo(ListSurah);
