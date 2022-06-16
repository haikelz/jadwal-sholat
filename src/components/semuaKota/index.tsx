import Link from "next/link";

interface kotaProps {
  kota: [id: string, lokasi: string];
}

const SemuaKota = ({ kota }: kotaProps) => {
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 text-center gap-5 grid-rows-1">
      {kota.map((loc: any) => (
        <Link href={`/jadwal-sholat/kota/${loc.id}`} key={loc.id}>
          <div
            className="cursor-pointer hover:from-sky-500 duration-300 transition-all hover:to-blue-600 rounded-md overflow-hidden bg-gradient-to-br from-sky-400 to-blue-500 py-6 px-10 border-2 border-black flex justify-center items-center"
            key={loc.id}
          >
            <a className="font-semibold text-xl">{loc.lokasi}</a>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SemuaKota;
