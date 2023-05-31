import { cx } from "classix";
import { m } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import reactStringReplace from "react-string-replace";
import { shallow } from "zustand/shallow";
import { TidakAda } from "~components/atoms";
import SearchBar from "~components/molecules/SearchBar";
import { removeSelectedSurat } from "~lib/helpers";
import { clickAnimation } from "~lib/utils/animations";
import { ListSuratProps } from "~models";
import useAppStore from "~store";

export default function ListSurat({ surat }: ListSuratProps) {
  const [search, setSearch] = useState<string>("");

  const { lastRead, setLastRead } = useAppStore(
    (state) => ({
      lastRead: state.lastRead,
      setLastRead: state.setLastRead,
    }),
    shallow
  );

  const filteredSurat = useMemo(
    () =>
      surat.filter((value) => {
        if (search === "") return value;
        else if (value.asma.id.short.toLowerCase().includes(search.toLowerCase())) return value;
      }),
    [surat, search]
  );

  useEffect(() => {
    if (secureLocalStorage.getItem("surat") as string) {
      setLastRead(JSON.parse(secureLocalStorage.getItem("surat") as string));
    }
  }, [setLastRead]);

  return (
    <>
      <div
        className={cx(
          "flex flex-col items-center justify-center",
          "text-center text-black",
          "dark:text-white"
        )}
      >
        <SearchBar setSearch={setSearch} />
        <p className="mt-2 text-lg font-medium">
          Terakhir dibaca:{" "}
          {lastRead.ayat || lastRead.number !== null ? (
            <Link
              href={`/quran/surat/${lastRead.number}`}
              onClick={() =>
                secureLocalStorage.setItem("selected-surat", lastRead.number?.toString() as string)
              }
            >
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
      {filteredSurat.length ? (
        <div
          className={cx(
            "grid w-full grid-cols-1 grid-rows-1 gap-4",
            "sm:grid-cols-2",
            "lg:grid-cols-3",
            "xl:grid-cols-4"
          )}
        >
          {filteredSurat.map((surat) => (
            <Link
              key={surat.number}
              href={`/quran/surat/${surat.number}`}
              onClick={removeSelectedSurat}
            >
              <m.div
                variants={clickAnimation}
                whileTap="whileTap"
                className={cx(
                  "flex flex-col rounded-sm",
                  "border-2 border-black bg-gray-100",
                  "p-4 text-left text-black",
                  "dark:border-gray-200 dark:bg-[#2A2A37] dark:text-white"
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
