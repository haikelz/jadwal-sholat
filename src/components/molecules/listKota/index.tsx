import { Kota } from "@/src/interfaces";
import { memo, useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/atoms/searchBar";
import TidakAda from "@/components/atoms/tidakAda";
import reactStringReplace from "react-string-replace";

const ListKota = ({ kota }: Kota) => {
  const [searchTerm, setSearchTerm] = useState("");

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
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 text-center gap-5 grid-rows-1 w-full">
          {filteredKota.map((loc, index: number) => (
            <Link
              href={`/jadwal-sholat/kota/${
                loc.id === "3212" ? (loc.id = "3211") : loc.id
              }`}
              key={index + 1}
            >
              <div className="cursor-pointer border-2 dark:bg-[#2A2A37] dark:border-white rounded-sm border-black overflow-hidden bg-gray-100 py-6 px-10 flex justify-center items-center">
                <a className="font-semibold text-xl">
                  {searchTerm
                    ? reactStringReplace(
                        loc.lokasi,
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
