import { kotaProps } from "src/props";
import { memo } from "react";
import { useAtom } from "jotai";
import { searchKotaAtom } from "src/store";
import Link from "next/link";
import SearchFilter from "../searchFilter";

const SemuaKota = ({ kota }: kotaProps) => {
  const [searchTerm, setSearchTerm] = useAtom(searchKotaAtom);

  return (
    <>
      <SearchFilter setSearchTerm={setSearchTerm} />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 text-center gap-5 grid-rows-1">
        {kota
          .filter((value) => {
            if (searchTerm === "") {
              return value;
            } else if (
              value.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return value;
            }
          })
          .map((loc, index: number) => (
            <Link
              href={`/jadwal-sholat/kota/${
                loc.id == "3212" ? (loc.id = "3211") : loc.id
              }`}
              key={index + 1}
            >
              <div className="cursor-pointer border-2 dark:bg-[#2A2A37] dark:border-white rounded-sm border-black overflow-hidden bg-teal-300 py-6 px-10 flex justify-center items-center">
                <a className="font-semibold text-xl">{loc.lokasi}</a>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default memo(SemuaKota);
