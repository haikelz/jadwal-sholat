import { removeSelectedSurat } from "@/lib/helpers";
import { cn } from "@/lib/utils/cn";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PreviousOrNext({ num }: { num: number }) {
  return (
    <div
      className={cn(
        "flex w-full gap-3 border-y py-4",
        num > 1 ? "justify-between" : "justify-end",
      )}
    >
      {num > 1 ? (
        <Button asChild variant="outline">
          <Link
            href={`/quran/${num - 1}`}
            onClick={removeSelectedSurat}
            aria-label="Surat sebelumnya"
          >
            <ArrowLeft aria-hidden="true" size={18} />
            <span>Sebelumnya</span>
          </Link>
        </Button>
      ) : null}
      {num < 114 ? (
        <Button asChild variant="outline">
          <Link
            href={`/quran/${num + 1}`}
            aria-label="Surat berikutnya"
            onClick={removeSelectedSurat}
          >
            <span>Berikutnya</span>
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
