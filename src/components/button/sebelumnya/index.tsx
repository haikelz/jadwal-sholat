import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

const Sebelumnya = ({ surat }: any) => {
  return (
    <Link href={`/quran/surah/${surat.number - 1}`}>
      {surat.number > 1 ? (
        <button className="px-3 py-1 flex items-center dark:border-white justify-center gap-2 border-2 border-black rounded-md">
          <MdArrowBack size="20px" />
          <p className="text-md font-semibold">Sebelumnya</p>
        </button>
      ) : (
        ""
      )}
    </Link>
  );
};

export default Sebelumnya;
