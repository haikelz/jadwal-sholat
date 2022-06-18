import Link from "next/link";

const ListSurah = ({ surah }: any) => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-1 gap-4">
      {surah.map((surat: any) => (
        <Link href={`/quran/surah/${surat.number}`} key={surat.number}>
          <div className="flex flex-col hover:scale-110 duration-300 cursor-pointer transition-all rounded-md p-4 bg-teal-300">
            <h1 className="font-bold text-xl text-left">{surat.number}</h1>
            <p>{surat.name.short}</p>
            <p>{surat.name.translation.id}</p>
            <p>Jumlah: {surat.numberOfVerses} ayat</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListSurah;
