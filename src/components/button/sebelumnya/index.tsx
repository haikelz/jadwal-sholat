import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const Sebelumnya = ({ surat }: any) => {
  return (
    <Link href={`/quran/surah/${surat.number - 1}`}>
      {surat.number > 1 ? (
        <button className="px-4 py-2 flex items-center justify-center gap-2 bg-teal-400 hover:bg-teal-500 duration-300 transition-all rounded-md">
          <FaArrowLeft />
          <p>Sebelumnya</p>
        </button>
      ) : (
        ""
      )}
    </Link>
  );
};

export default Sebelumnya;
