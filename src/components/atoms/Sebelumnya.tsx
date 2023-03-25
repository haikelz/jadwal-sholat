import { clsx } from "clsx";
import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";
import { SuratProps } from "~types";

export const Sebelumnya = ({ surat }: SuratProps) => {
  return (
    <>
      {surat.number > 1 ? (
        <Link href={`/quran/surat/${surat.number - 1}`}>
          <button
            type="button"
            aria-label="sebelumnya"
            className={clsx(
              "flex items-center justify-center gap-1 rounded-md",
              "border-2 border-black px-2 py-1 text-black",
              "dark:border-white dark:text-white"
            )}
          >
            <MdOutlineArrowBack size={25} />
            <p className="text-md font-semibold">Sebelumnya</p>
          </button>
        </Link>
      ) : null}
    </>
  );
};
