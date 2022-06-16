import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const Selanjutnya = ({ surat }: any) => {
  return (
    <Link href={`/quran/surah/${surat.number + 1}`}>
      {surat.number < 114 ? (
        <button className="px-4 py-2 flex items-center justify-center gap-2 bg-teal-400 hover:bg-teal-500 duration-300 transition-all rounded-md">
          <p>Selanjutnya</p>
          <FaArrowRight />
        </button>
      ) : (
        ""
      )}
    </Link>
  );
};

export default Selanjutnya;
