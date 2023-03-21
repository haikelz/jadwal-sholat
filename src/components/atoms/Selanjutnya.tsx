import { clsx } from "clsx";
import Link from "next/link";
import { MdOutlineArrowForward } from "react-icons/md";
import { SuratProps } from "~types";

export const Selanjutnya = ({ surat }: SuratProps) => {
  return (
    <>
      {surat.number < 114 ? (
        <Link href={`/quran/surah/${surat.number + 1}`} passHref>
          <button
            type="button"
            aria-label="selanjutnya"
            className={clsx(
              "flex items-center justify-center gap-1 rounded-md text-black",
              "border-2 border-black px-2 py-1",
              "dark:border-white dark:text-white"
            )}
          >
            <p className="text-md font-semibold">Selanjutnya</p>
            <MdOutlineArrowForward size={25} />
          </button>
        </Link>
      ) : null}
    </>
  );
};
