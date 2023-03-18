import { useAtom } from "jotai";
import Link from "next/link";
import { memo, useEffect, useMemo, useState } from "react";
import reactStringReplace from "react-string-replace";
import { clsx } from "clsx";
import SearchBar from "~atoms/SearchBar";
import TidakAda from "~atoms/TidakAda";
import { lastReadAtom } from "~store";

type DaftarSurahProps = {
  surat: [
    surat: {
      number: string;
      asma: {
        id: {
          short: string;
        };
        translation: {
          id: string;
        };
      };
      ayahCount: string;
      type: {
        id: string;
      };
    }
  ];
};

const ListSurah = ({ surat }: DaftarSurahProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [lastRead, setLastRead] = useAtom(lastReadAtom);

  const filteredSurah = useMemo(
    () =>
      surat.filter((value) => {
        if (searchTerm === "") {
          return value;
        } else if (value.asma.id.short.toLowerCase().includes(searchTerm.toLowerCase())) {
          return value;
        }
      }),
    [surat, searchTerm]
  );

  useEffect(() => {
    if (localStorage.getItem("surah")) {
      setLastRead(JSON.parse(localStorage.getItem("surah") || ""));
    }
  }, [setLastRead]);

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center text-black dark:text-white">
        <SearchBar setSearchTerm={setSearchTerm} />
        <p className="mt-2 text-lg font-medium">
          Terakhir dibaca:{" "}
          {lastRead !== null ? (
            <Link href={`/quran/surah/${lastRead.number}`}>
              <span
                className={clsx(
                  "hover-animation underline-animation text-black",
                  "hover:text-red-500 dark:hover:text-blue-500",
                  "dark:text-white"
                )}
              >
                Surah {lastRead.name} ayat {lastRead.ayat}
              </span>
            </Link>
          ) : (
            "belum ada"
          )}
        </p>
      </div>
      {filteredSurah.length ? (
        <div
          className={clsx(
            "grid w-full grid-cols-1 grid-rows-1 gap-4",
            "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          )}
        >
          {filteredSurah.map((surat) => (
            <Link key={surat.number} href={`/quran/surah/${surat.number}`}>
              <div
                className={clsx(
                  "clicky flex flex-col rounded-sm border-2 border-black bg-gray-100 p-4 text-left text-black dark:text-white",
                  "dark:border-white dark:bg-[#2A2A37]"
                )}
              >
                <p className="text-right font-semibold tracking-wide">{surat.type.id}</p>
                <span className="text-xl font-bold">{surat.number}</span>
                <p className="text-lg font-bold">
                  {searchTerm
                    ? reactStringReplace(
                        surat.asma.id.short,
                        searchTerm,
                        (match: string, index: number) => (
                          <span key={index + 1} className="bg-lime-400 dark:bg-lime-600">
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
