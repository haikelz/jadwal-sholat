import { memo, useState } from "react";
import { DaftarSurah } from "@/src/interfaces";
import SearchBar from "@/src/components/atoms/searchBar";
import TidakAda from "@/src/components/atoms/tidakAda";
import Link from "next/link";
import reactStringReplace from "react-string-replace";

const ListSurah = ({ surat }: DaftarSurah) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredSurah = surat.filter((value) => {
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
        <div className="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-1 gap-4 w-full">
          {filteredSurah.map((surat) => (
            <Link href={`/quran/surah/${surat.number}`} key={surat.number}>
              <div className="flex flex-col text-left cursor-pointer p-4 rounded-sm bg-gray-100 dark:bg-[#2A2A37] border-2 border-black dark:border-white">
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
