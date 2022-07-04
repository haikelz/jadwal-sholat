import { kotaProps } from "src/props";
import Link from "next/link";

const SemuaKota = ({ kota }: kotaProps) => {
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 text-center gap-5 grid-rows-1">
      {kota.map((loc, index: number) => (
        <Link
          href={`/jadwal-sholat/kota/${
            loc.id == "3212" ? (loc.id = "3211") : loc.id
          }`}
          key={index + 1}
        >
          <div className="cursor-pointer border-2 dark:bg-[#2A2A37] dark:border-white border-black overflow-hidden bg-teal-300 py-6 px-10 flex justify-center items-center">
            <a className="font-semibold text-xl">{loc.lokasi}</a>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SemuaKota;
