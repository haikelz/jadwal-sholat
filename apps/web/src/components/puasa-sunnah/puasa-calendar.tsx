import { Badge } from "@/components/reui/badge";
import type { PuasaSunnahScheduleDate } from "@/interfaces";
import { cn } from "@/lib/utils/cn";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getISODay,
  startOfMonth,
} from "date-fns";
import { id } from "date-fns/locale";
import { useId } from "react";

const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
// Day cells are ~140px wide on desktop; more badges than this would wrap
// into a tall cell, so the rest collapse into "+N".
const MAX_BADGES = 2;

/**
 * The selected month as a Monday-first calendar for desktop widths. Fasting
 * days carry their types as badges; the phone layout keeps the list.
 */
export function PuasaCalendar({
  year,
  month,
  puasaList,
  todayIso,
}: {
  /** yyyy */
  year: string;
  /** MM */
  month: string;
  /** Already filtered by the selected fasting type. */
  puasaList: PuasaSunnahScheduleDate[];
  /** Today as yyyy-MM-dd; earlier days are dimmed. */
  todayIso?: string;
}) {
  const captionId = useId();
  const first = new Date(Number(year), Number(month) - 1, 1);
  const days = eachDayOfInterval({
    start: startOfMonth(first),
    end: endOfMonth(first),
  });
  // getISODay: Monday = 1 … Sunday = 7.
  const leading = getISODay(first) - 1;
  const trailing = (7 - ((leading + days.length) % 7)) % 7;
  const fastsByDate = new Map(
    puasaList.map((puasa) => [puasa.date.slice(0, 10), puasa]),
  );
  const monthLabel = format(first, "MMMM yyyy", { locale: id });

  return (
    <div className="flex flex-col">
      <p id={captionId} className="sr-only">
        Kalender puasa sunnah {monthLabel}, dimulai hari Senin.
      </p>
      <div
        aria-hidden="true"
        className="grid grid-cols-7 border-b text-xs text-muted-foreground"
      >
        {WEEKDAYS.map((weekday) => (
          <span key={weekday} className="px-2 py-2">
            {weekday}
          </span>
        ))}
      </div>
      <ol
        aria-labelledby={captionId}
        className="grid grid-cols-7 gap-px bg-border"
      >
        {Array.from({ length: leading }, (_, index) => (
          <li key={`lead-${index}`} aria-hidden="true" className="bg-card" />
        ))}
        {days.map((day) => {
          const iso = format(day, "yyyy-MM-dd");
          const fast = fastsByDate.get(iso);
          const isToday = iso === todayIso;
          const isPast = todayIso !== undefined && iso < todayIso;
          const names = fast?.recommendations.map((item) => item.name) ?? [];
          const shown = fast?.recommendations.slice(0, MAX_BADGES) ?? [];
          const hidden = names.length - shown.length;

          return (
            <li
              key={iso}
              aria-current={isToday ? "date" : undefined}
              className={cn(
                "flex min-h-24 min-w-0 flex-col gap-1.5 bg-card p-2",
                isToday && "ring-1 ring-foreground/30 ring-inset",
                isPast && "text-muted-foreground",
              )}
            >
              <span className="sr-only">
                {format(day, "EEEE, d MMMM", { locale: id })}
                {isToday ? " (hari ini)" : ""}
                {names.length ? `: ${names.join(", ")}` : ""}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "text-sm tabular-nums",
                  (fast || isToday) && "font-medium",
                  isToday && "font-semibold text-foreground",
                )}
              >
                {format(day, "d")}
              </span>
              {fast ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex min-w-0 flex-wrap gap-1",
                    // Past fasts recede, as in the list view.
                    isPast && "opacity-60",
                  )}
                >
                  {shown.map((recommendation) => (
                    <Badge
                      key={recommendation.key}
                      variant="outline"
                      className="max-w-full"
                    >
                      <span className="truncate">{recommendation.name}</span>
                    </Badge>
                  ))}
                  {hidden > 0 ? (
                    <Badge variant="outline">+{hidden}</Badge>
                  ) : null}
                </span>
              ) : null}
            </li>
          );
        })}
        {Array.from({ length: trailing }, (_, index) => (
          <li key={`trail-${index}`} aria-hidden="true" className="bg-card" />
        ))}
      </ol>
    </div>
  );
}
