import { Surat } from "@/interfaces";
import Link from "next/link";
import { MdPlayArrow } from "react-icons/md";

export const Sebelumnya = ({ surat }: Surat) => {
  return (
    <>
      {surat.number > 1 && (
        <Link href={`/quran/surah/${surat.number - 1}`} passHref>
          <button className="flex items-center justify-center gap-1 rounded-md border-2 border-black px-2 py-1 dark:border-white">
            <MdPlayArrow className="rotate-180" size="25px" />
            <p className="text-md font-semibold">Sebelumnya</p>
          </button>
        </Link>
      )}
    </>
  );
};
