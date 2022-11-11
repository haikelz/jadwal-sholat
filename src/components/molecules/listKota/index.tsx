import { Kota } from "@/src/interfaces";
import { memo, useState } from "react";
import Link from "next/link";
import SearchBar from "@/src/components/atoms/searchBar";
import TidakAda from "@/src/components/atoms/tidakAda";
import reactStringReplace from "react-string-replace";

const ListKota = ({ kota }: Kota) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  /**
   * Di API nya, ada satu kota yang mempunyai dua id yang berbeda(3211 dan 3212), jadi dia munculnya 2 kali di listKota nya.
   * Hal ini menjadi masalah karena hanya satu id yang valid, yakni 3211.
   * Untuk 3212 tidak valid, karena sebenarnya itu tidak ada.
   * Nah makanya disini kita coba memfilter id-nya agar kota yang memiliki id 3212 tidak ikutan masuk
   */
  const filteredKota = kota.filter((value) => {
    if (searchTerm === "") {
      return value.id !== "3212";
    } else if (value.lokasi.toLowerCase().includes(searchTerm.toLowerCase())) {
      return value.id !== "3212";
    }
  });

  return (
    <>
      <SearchBar setSearchTerm={setSearchTerm} />
      {filteredKota.length ? (
        <div className="grid w-full grid-cols-1 grid-rows-1 gap-5 text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredKota.map((loc, index) => (
            <Link href={`/jadwal-sholat/kota/${loc.id}`} key={index + 1}>
              <div className="clicky flex items-center justify-center overflow-hidden rounded-sm border-2 border-black bg-gray-100 py-6 px-10 dark:border-white dark:bg-[#2A2A37]">
                <a className="text-xl font-semibold">
                  {searchTerm
                    ? reactStringReplace(loc.lokasi, searchTerm, (match: string, index: number) => (
                        <span key={index + 1} className="bg-lime-400 dark:bg-lime-600">
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
