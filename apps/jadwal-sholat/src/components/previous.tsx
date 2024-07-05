import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { P, match } from "ts-pattern";
import { SuratProps } from "~interfaces";
import { removeSelectedSurat } from "~lib/helpers";
import { cn } from "~lib/utils/cn";

export function Previous({ data }: SuratProps) {
  return (
    <>
      {match(data)
        .with({ number: P.when((number) => number > 1) }, () => (
          <Link href={`/quran/surat/${data.number - 1}`}>
            <button
              onClick={removeSelectedSurat}
              type="button"
              aria-label="Previous"
              className={cn(
                "flex items-center justify-center space-x-1 rounded-md",
                "border-2 border-black px-2 py-1 ",
                "dark:border-white dark:text-white"
              )}
            >
              <ArrowLeft size={20} />
              <p className="text-base font-bold">Previous</p>
            </button>
          </Link>
        ))
        .otherwise(() => null)}
    </>
  );
}
