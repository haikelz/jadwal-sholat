import Link from "next/link";
import { MdArrowForward } from "react-icons/md";

const Selanjutnya = ({ surat }: any) => {
  return (
    <Link href={`/quran/surah/${surat.number + 1}`}>
      {surat.number < 114 ? (
        <button className="px-3 py-1 dark:border-white flex items-center justify-center gap-2 border-2 border-black rounded-md">
          <p className="text-md font-semibold">Selanjutnya</p>
          <MdArrowForward size="20px" />
        </button>
      ) : (
        ""
      )}
    </Link>
  );
};

export default Selanjutnya;
