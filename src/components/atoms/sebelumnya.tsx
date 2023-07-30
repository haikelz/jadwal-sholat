import { cx } from "classix";
import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";
import { removeSelectedSurat } from "~lib/helpers";
import { SuratProps } from "~models";

export function Sebelumnya({ surat }: SuratProps) {
  return (
    <>
      {surat.number > 1 ? (
        <Link href={`/quran/surat/${surat.number - 1}`}>
          <button
            onClick={removeSelectedSurat}
            type="button"
            aria-label="sebelumnya"
            className={cx(
              "flex items-center justify-center space-x-1 rounded-md",
              "border-2 border-black px-2 py-1 text-black",
              "dark:border-white dark:text-white"
            )}
          >
            <MdOutlineArrowBack size={25} />
            <p className="text-base font-semibold">Sebelumnya</p>
          </button>
        </Link>
      ) : null}
    </>
  );
}
