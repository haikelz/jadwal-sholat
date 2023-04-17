import { cx } from "classix";
import { m } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import reactStringReplace from "react-string-replace";
import { TidakAda } from "~atoms";
import { clickAnimation } from "~lib/utils/constants";
import { ListSuratProps } from "~models";
import SearchBar from "~molecules/SearchBar";
import useAppStore from "~store";

export default function ListSurat({ surat }: ListSuratProps) {
  const { lastRead, setLastRead } = useAppStore((state) => state);
  const [search, setSearch] = useState<string>("");

  const filteredsurat = useMemo(
    () =>
      surat.filter((value) => {
        if (search === "") {
          return value;
        } else if (value.asma.id.short.toLowerCase().includes(search.toLowerCase())) {
          return value;
        }
      }),
    [surat, search]
  );

  useEffect(() => {
    if (localStorage.getItem("surat")) {
      setLastRead(JSON.parse(localStorage.getItem("surat") || ""));
    }
  }, [setLastRead]);

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center text-black dark:text-white">
        <SearchBar setSearch={setSearch} />
        <p className="mt-2 text-lg font-medium">
          Terakhir dibaca:{" "}
          {lastRead.ayat || lastRead.number !== null ? (
            <Link href={`/quran/surat/${lastRead.number}#${lastRead.ayat}`}>
              <span
                className={cx(
                  "hover-animation underline-animation text-black",
                  "hover:text-red-500",
                  "dark:text-white dark:hover:text-blue-500"
                )}
              >
                Surat {lastRead.name} ayat {lastRead.ayat}
              </span>
            </Link>
          ) : (
            "belum ada"
          )}
        </p>
      </div>
      {filteredsurat.length ? (
        <div
          className={cx(
            "grid w-full grid-cols-1 grid-rows-1 gap-4",
            "sm:grid-cols-2",
            "lg:grid-cols-3",
            "xl:grid-cols-4"
          )}
        >
          {filteredsurat.map((surat) => (
            <Link key={surat.number} href={`/quran/surat/${surat.number}`}>
              <m.div
                {...clickAnimation}
                className={cx(
                  "flex flex-col rounded-sm border-2 border-black bg-gray-100 p-4 text-left text-black",
                  "dark:border-white dark:bg-[#2A2A37] dark:text-white"
                )}
              >
                <p className="text-right font-semibold tracking-wide">{surat.type.id}</p>
                <span className="text-xl font-bold">{surat.number}</span>
                <p className="text-lg font-bold">
                  {search
                    ? reactStringReplace(
                        surat.asma.id.short,
                        search,
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
              </m.div>
            </Link>
          ))}
        </div>
      ) : (
        <TidakAda title="surat" />
      )}
    </>
  );
}
