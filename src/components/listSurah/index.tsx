import Link from "next/link";

const ListSurah = ({ surah }: any) => {
  return (
    <div className="grid grid-cols-4 grid-rows-1 gap-4">
      {surah.map((surat: any) => (
        <Link href={`/quran/surah/${surat.number}`} key={surat.number}>
          <div className="flex flex-col hover:scale-110 duration-300 cursor-pointer transition-all rounded-sm p-4 bg-teal-300">
            <h1>{surat.number}</h1>
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
