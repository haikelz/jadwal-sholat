import { SuratProps } from "@/interfaces";
import { removeSelectedSurat } from "@/lib/helpers";
import { cn } from "@/lib/utils/cn";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Next({ data }: SuratProps) {
  return (
    <>
      {data.number ? (
        <Link href={`/quran/${data.number + 1}`}>
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
      ) : null}
    </>
  );
}
