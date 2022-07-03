import { listSurahProps } from "src/props";
import Link from "next/link";

const ListSurah = ({ surah }: listSurahProps) => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 md:grid-cols-3 grid-rows-1 gap-4">
      {surah.map((surat, index: number) => (
        <Link href={`/quran/surah/${surat.number}`} key={index + 1}>
          <div className="flex flex-col text-left border-2 border-black cursor-pointer p-4 bg-teal-300 dark:bg-[#2A2A37] dark:border-white">
            <h1 className="font-bold text-xl">{surat.number}</h1>
            <p className="font-bold text-lg">{surat.asma.id.short}</p>
            <p className="font-medium">{surat.asma.translation.id}</p>
            <p>Jumlah: {surat.ayahCount} ayat</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListSurah;
