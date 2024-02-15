"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SortByOrder } from "~components/atoms";
import { SearchBar } from "~components/molecules";
import { ListSurat } from "~components/organisms";
import { useAscending } from "~hooks";
import { ListSuratProps } from "~interfaces";
import { cx } from "~lib/helpers";
import useGlobalStore from "~store";

export default function QuranClient({ surat }: { surat: ListSuratProps }) {
  const searchParams = useSearchParams();

  const { isAscending, setIsAscending, deferredSearch } = useAscending(
    searchParams.get("search") as string
  );

  const { lastRead } = useGlobalStore((state) => ({
    lastRead: state.lastRead,
  }));

  return (
    <>
      <div
        className={cx(
          "flex flex-col items-center justify-center",
          "text-center ",
          "dark:text-white"
        )}
      >
        <SearchBar searchParams={searchParams} name="search" />
        <p className="mt-2 text-lg font-medium">
          Terakhir dibaca:{" "}
          {lastRead.ayat || lastRead.number !== null ? (
            <Link
              href={`/quran/surat/${lastRead.number}`}
              onClick={() =>
                localStorage.setItem(
                  "selected-surat",
                  lastRead.number!.toString() as string
                )
              }
            >
              <span
                className={cx(
                  "hover-animation underline-animation font-bold",
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
      <SortByOrder isAscending={isAscending} setIsAscending={setIsAscending} />
      <ListSurat
        surat={surat}
        deferredSearch={deferredSearch}
        isAscending={isAscending}
      />
    </>
  );
}
