import { cx } from "classix";
import Link from "next/link";
import { MdOutlineArrowForward } from "react-icons/md";
import { removeSelectedSurat } from "~lib/helpers";
import { SuratProps } from "~models";

export function Selanjutnya({ surat }: SuratProps) {
  return (
    <>
      {surat.number < 114 ? (
        <Link href={`/quran/surat/${surat.number + 1}`}>
          <button
            onClick={removeSelectedSurat}
            type="button"
            aria-label="selanjutnya"
            className={cx(
              "flex items-center justify-center space-x-1 rounded-md",
              "text-black border-2 border-black px-2 py-1",
              "dark:border-white dark:text-white"
            )}
          >
            <p className="text-base font-semibold">Selanjutnya</p>
            <MdOutlineArrowForward size={25} />
          </button>
        </Link>
      ) : null}
    </>
  );
}
