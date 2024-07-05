import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { P, match } from "ts-pattern";
import { SuratProps } from "~interfaces";
import { removeSelectedSurat } from "~lib/helpers";
import { cn } from "~lib/utils/cn";

export function Next({ data }: SuratProps) {
  return (
    <>
      {match(data)
        .with({ number: P.when((number) => number < 144) }, () => (
          <Link href={`/quran/surat/${data.number + 1}`}>
            <button
              type="button"
              aria-label="next"
              onClick={removeSelectedSurat}
              className={cn(
                "flex items-center justify-center space-x-1 rounded-md",
                " border-2 border-black px-2 py-1",
                "dark:border-white dark:text-white"
              )}
            >
              <p className="text-base font-bold">Next</p>
              <ArrowRight size={20} />
            </button>
          </Link>
        ))
        .otherwise(() => null)}
    </>
  );
}
