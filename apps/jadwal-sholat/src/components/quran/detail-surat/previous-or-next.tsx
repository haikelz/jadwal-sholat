import { removeSelectedSurat } from "@/lib/helpers";
import { cn } from "@/lib/utils/cn";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const linkClass =
  "flex flex-col gap-0.5 rounded-lg px-3 py-2 transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function PreviousOrNext({ num }: { num: number }) {
  return (
    <nav
      aria-label="Navigasi surat"
      className={cn(
        "flex w-full gap-2 border-t pt-4",
        num > 1 ? "justify-between" : "justify-end",
      )}
    >
      {num > 1 ? (
        <Link
          href={`/quran/${num - 1}`}
          onClick={removeSelectedSurat}
          className={cn(linkClass, "items-start -ml-3")}
        >
          <span className="text-xs text-muted-foreground">Surat sebelumnya</span>
          <span className="flex items-center gap-1 text-sm font-medium tabular-nums">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Surat {num - 1}
          </span>
        </Link>
      ) : null}
      {num < 114 ? (
        <Link
          href={`/quran/${num + 1}`}
          onClick={removeSelectedSurat}
          className={cn(linkClass, "items-end -mr-3")}
        >
          <span className="text-xs text-muted-foreground">Surat berikutnya</span>
          <span className="flex items-center gap-1 text-sm font-medium tabular-nums">
            Surat {num + 1}
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
