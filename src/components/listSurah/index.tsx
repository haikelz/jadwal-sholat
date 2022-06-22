import Link from "next/link";

const ListSurah = ({ surah }: any) => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 md:grid-cols-3 grid-rows-1 gap-4">
      {surah.map((surat: any, index: number) => (
        <Link href={`/quran/surah/${surat.number}`} key={index + 1}>
          <div className="flex flex-col text-left hover:scale-110 duration-300 cursor-pointer transition-all rounded-md p-4 bg-teal-300">
            <h1 className="font-bold text-xl">{surat.number}</h1>
            <p className="font-bold text-lg">{surat.name.transliteration.id}</p>
            <p className="font-medium">{surat.name.translation.id}</p>
            <p>Jumlah: {surat.numberOfVerses} ayat</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListSurah;
