import { Button } from "@/components/ui/button";
import { removeSelectedSurat } from "@/lib/helpers";
import { cn } from "@/lib/utils/cn";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export function PreviousOrNext({ num }: { num: number }) {
  return (
    <nav
      aria-label="Navigasi surat"
      className={cn(
        "flex w-full gap-2",
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
            <ArrowLeft aria-hidden="true" data-icon="inline-start" />
            Sebelumnya
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
            Berikutnya
            <ArrowRight aria-hidden="true" data-icon="inline-end" />
          </Link>
        </Button>
      ) : null}
    </nav>
  );
}
