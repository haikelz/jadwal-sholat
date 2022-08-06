import { MdPlayArrow } from "react-icons/md";
import { Surat } from "src/interfaces";
import Link from "next/link";

const Sebelumnya = ({ surat }: Surat) => {
  return (
    <>
      {surat.number > 1 && (
        <Link href={`/quran/surah/${surat.number - 1}`} passHref>
          <button className="px-2 py-1 flex items-center dark:border-white justify-center gap-1 border-2 border-black rounded-md">
            <MdPlayArrow className="rotate-180" size="25px" />
            <p className="text-md font-semibold">Sebelumnya</p>
          </button>
        </Link>
      )}
    </>
  );
};

export default Sebelumnya;
