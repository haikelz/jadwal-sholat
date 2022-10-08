import { memo, useEffect, useState } from "react";
import { DaftarSurah } from "@/src/interfaces";
import { useAtom } from "jotai";
import { lastReadAtom } from "@/src/store";
import SearchBar from "@/src/components/atoms/searchBar";
import TidakAda from "@/src/components/atoms/tidakAda";
import Link from "next/link";
import reactStringReplace from "react-string-replace";

const ListSurah = ({ surat }: DaftarSurah) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [lastRead, setLastRead] = useAtom(lastReadAtom);

  const filteredSurah = surat.filter((value) => {
    if (searchTerm === "") {
      return value;
    } else if (value.asma.id.short.toLowerCase().includes(searchTerm.toLowerCase())) {
      return value;
    }
  });

  useEffect(() => {
    if (localStorage.getItem("surah")) {
      setLastRead(JSON.parse(localStorage.getItem("surah") || ""));
    }
  }, [setLastRead]);

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center">
        <SearchBar setSearchTerm={setSearchTerm} />
        <p className="mt-2 text-lg font-medium">
          Terakhir dibaca:{" "}
          {lastRead !== null ? (
            <Link href={`/quran/surah/${lastRead.number}`}>
              <span className="hover-animation underline-animation hover:text-red-500 dark:hover:text-blue-500">
                Surah {lastRead.name} ayat {lastRead.ayat}
              </span>
            </Link>
          ) : (
            "belum ada"
          )}
        </p>
      </div>
      {filteredSurah.length ? (
        <div className="grid w-full grid-cols-1 grid-rows-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredSurah.map((surat) => (
            <Link key={surat.number} href={`/quran/surah/${surat.number}`}>
              <div
                key={surat.number}
                className="flex cursor-pointer flex-col rounded-sm border-2 border-black bg-gray-100 p-4 text-left dark:border-white dark:bg-[#2A2A37]"
              >
                <p className="text-right font-semibold tracking-wide">{surat.type.id}</p>
                <h1 className="text-xl font-bold">{surat.number}</h1>
                <p className="text-lg font-bold">
                  {searchTerm
                    ? reactStringReplace(
                        surat.asma.id.short,
                        searchTerm,
                        (match: string, index: number) => (
                          <span key={index++} className="bg-lime-400 dark:bg-lime-600">
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
