import { Kota } from "@/src/interfaces";
import { memo, useState } from "react";
import Link from "next/link";
import SearchBar from "@/src/components/atoms/searchBar";
import TidakAda from "@/src/components/atoms/tidakAda";
import reactStringReplace from "react-string-replace";

const ListKota = ({ kota }: Kota) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredKota = kota.filter((value) => {
    if (searchTerm === "") {
      return value;
    } else if (value.lokasi.toLowerCase().includes(searchTerm.toLowerCase())) {
      return value;
    }
  });

  return (
    <>
      <SearchBar setSearchTerm={setSearchTerm} />
      {filteredKota.length ? (
        <div className="grid w-full grid-cols-1 grid-rows-1 gap-5 text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredKota.map((loc, index) => (
            <Link
              href={`/jadwal-sholat/kota/${loc.id === "3212" ? (loc.id = "3211") : loc.id}`}
              key={index + 1}
            >
              <div className="flex cursor-pointer items-center justify-center overflow-hidden rounded-sm border-2 border-black bg-gray-100 py-6 px-10 dark:border-white dark:bg-[#2A2A37]">
                <a className="text-xl font-semibold">
                  {searchTerm
                    ? reactStringReplace(loc.lokasi, searchTerm, (match: string, index: number) => (
                        <span key={index++} className="bg-lime-400 dark:bg-lime-600">
                          {match}
                        </span>
                      ))
                    : loc.lokasi}
                </a>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <TidakAda title="Kota" />
      )}
    </>
  );
};

export default memo(ListKota);
