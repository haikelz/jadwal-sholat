import { removeSelectedSurat } from "@/lib/helpers";
import { cn } from "@/lib/utils/cn";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "./ui/button";

export default function PreviousOrNext({ num }: { num: number }) {
  return (
    <div
      className={cn(
        "flex w-full space-x-3",
        num > 1 ? "justify-between" : "justify-end"
      )}
    >
      {num > 1 ? (
        <Link href={`/quran/surat/${num - 1}`}>
          <Button
            onClick={removeSelectedSurat}
            type="button"
            aria-label="Previous"
            className={cn("flex items-center justify-center space-x-1")}
          >
            <ArrowLeft size={20} />
            <p className="text-base font-bold">Previous</p>
          </Button>
        </Link>
      ) : null}
      {num < 114 ? (
        <Link href={`/quran/surat/${num + 1}`}>
          <Button
            type="button"
            aria-label="next"
            onClick={removeSelectedSurat}
            className={cn(
              "flex items-center justify-center space-x-1 rounded-md"
            )}
          >
            <p className="text-base font-bold">Next</p>
            <ArrowRight size={20} />
          </Button>
        </Link>
      ) : null}
    </div>
  );
}
