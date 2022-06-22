import { FaArrowAltCircleLeft } from "react-icons/fa";
import Link from "next/link";

const Sebelumnya = ({ surat }: any) => {
  return (
    <Link href={`/quran/surah/${surat.number - 1}`}>
      {surat.number > 1 ? (
        <button className="px-3 py-1 flex items-center justify-center gap-2 border-2 border-black duration-300 transition-all rounded-md">
          <FaArrowAltCircleLeft />
          <p className="text-md font-semibold">Sebelumnya</p>
        </button>
      ) : (
        ""
      )}
    </Link>
  );
};

export default Sebelumnya;
