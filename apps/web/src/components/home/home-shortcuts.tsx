"use client";

import { useFetch } from "@/hooks";
import type { PuasaSunnahScheduleResponse } from "@/interfaces";
import { findNextFast } from "@jadwal-sholat/core/puasa";
import { formatToIndonesianDate } from "@/lib/helpers/format-to-indonesian-date";
import { cn } from "@/lib/utils/cn";
import useGlobalStore from "@/store";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";

function ShortcutRow({
  href,
  label,
  value,
  onClick,
}: {
  href: string;
  label: string;
  value: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex min-h-14 items-center justify-between gap-3 border-b px-1 py-3 outline-none transition-colors hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <span className="flex min-w-0 flex-col">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="truncate text-sm font-medium">{value}</span>
      </span>
      <ChevronRight
        aria-hidden="true"
        className="size-4 shrink-0 text-muted-foreground"
      />
    </a>
  );
}

/**
 * Quiet links from the schedule into the rest of the app: where the reader
 * stopped in the Qur'an and the next sunnah fast. Each row hides itself when
 * it has nothing to show.
 */
export function HomeShortcuts({
  month,
  todayIso,
  className,
}: {
  /** `yyyy-MM` of today, from the caller's live clock. */
  month?: string;
  /** Today as `yyyy-MM-dd`, from the caller's live clock. */
  todayIso?: string;
  className?: string;
}) {
  const { lastRead, setLastRead } = useGlobalStore((state) => ({
    lastRead: state.lastRead,
    setLastRead: state.setLastRead,
  }));

  useEffect(() => {
    try {
      const saved = localStorage.getItem("surat");
      if (saved) setLastRead(JSON.parse(saved));
    } catch {
      // Blocked or corrupt storage: the row simply stays hidden.
    }
  }, [setLastRead]);

  // Same URL as the Puasa Sunnah page, so both share one cached response.
  const { data } = useFetch<PuasaSunnahScheduleResponse>(
    month ? `/api/sunnah-fasting?period=month&date=${month}-01` : "",
  );
  const nextFast =
    todayIso && data ? findNextFast(data.data.dates, todayIso) : undefined;

  const hasLastRead = lastRead.number !== null && lastRead.ayat !== null;
  if (!hasLastRead && !nextFast) return null;

  return (
    <nav
      aria-label="Pintasan"
      className={cn("flex min-w-0 flex-col border-t", className)}
    >
      {hasLastRead ? (
        <ShortcutRow
          href={`/quran/${lastRead.number}`}
          label="Lanjutkan membaca"
          value={`${lastRead.name} · ayat ${lastRead.ayat}`}
          onClick={() => {
            try {
              localStorage.setItem("selected-surat", String(lastRead.number));
            } catch {
              // The surah page still opens; it just won't jump to the ayah.
            }
          }}
        />
      ) : null}
      {nextFast ? (
        <ShortcutRow
          href="/sunnah-fasting"
          label="Puasa berikutnya"
          value={`${formatToIndonesianDate(nextFast.date) ?? nextFast.date.slice(0, 10)} · ${nextFast.recommendations
            .map((recommendation) => recommendation.name)
            .join(", ")}`}
        />
      ) : null}
    </nav>
  );
}
