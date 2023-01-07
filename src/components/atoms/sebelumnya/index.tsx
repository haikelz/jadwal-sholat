import { SuratProps } from "@/types";
import Link from "next/link";
import { MdPlayArrow } from "react-icons/md";
import { twJoin } from "tailwind-merge";

const Sebelumnya = ({ surat }: SuratProps) => {
  return (
    <>
      {surat.number > 1 ? (
        <Link href={`/quran/surah/${surat.number - 1}`} passHref>
          <button
            className={twJoin(
              "flex items-center justify-center gap-1 rounded-md",
              "border-2 border-black px-2 py-1 dark:border-white"
            )}
          >
            <MdPlayArrow className="rotate-180" size="25px" />
            <p className="text-md font-semibold">Sebelumnya</p>
          </button>
        </Link>
      ) : null}
    </>
  );
};

export default Sebelumnya;
