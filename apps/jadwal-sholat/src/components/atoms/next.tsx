import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SuratProps } from "~interfaces";
import { cx } from "~lib/helpers";
import { removeSelectedSurat } from "~lib/helpers";

export function Next({ surat }: SuratProps) {
  return (
    <>
      {surat.number < 114 ? (
        <Link href={`/quran/surat/${surat.number + 1}`}>
          <button
            type="button"
            aria-label="next"
            onClick={removeSelectedSurat}
            className={cx(
              "flex items-center justify-center space-x-1 rounded-md",
              " border-2 border-black px-2 py-1",
              "dark:border-white dark:text-white"
            )}
          >
            <p className="text-base font-bold">Next</p>
            <ArrowRight size={20} />
          </button>
        </Link>
      ) : null}
    </>
  );
}
