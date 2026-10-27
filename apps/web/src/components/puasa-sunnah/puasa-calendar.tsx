import { Badge } from "@/components/reui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { PuasaSunnahScheduleDate } from "@/interfaces";
import { cn } from "@/lib/utils/cn";
import { getPuasaShortName } from "@jadwal-sholat/core/puasa";
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

/**
 * The selected month as a Monday-first calendar for desktop widths. A fasting
 * day shows every type as a short label and opens a dialog with the full
 * names; the phone layout keeps the list.
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

          return (
            <li
              key={iso}
              aria-current={isToday ? "date" : undefined}
              className={cn(
                "flex min-h-24 min-w-0 bg-card",
                isToday && "ring-1 ring-foreground/30 ring-inset",
                isPast && "text-muted-foreground",
              )}
            >
              {fast ? (
                <PuasaDay
                  day={day}
                  isPast={isPast}
                  isToday={isToday}
                  puasa={fast}
                />
              ) : (
                <div className="flex min-w-0 flex-1 flex-col p-2">
                  <span className="sr-only">
                    {format(day, "EEEE, d MMMM", { locale: id })}
                    {isToday ? " (hari ini)" : ""}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-sm tabular-nums",
                      isToday && "font-semibold text-foreground",
                    )}
                  >
                    {format(day, "d")}
                  </span>
                </div>
              )}
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

type PuasaDayProps = {
  readonly day: Date;
  readonly isPast: boolean;
  readonly isToday: boolean;
  readonly puasa: PuasaSunnahScheduleDate;
};

/**
 * A fasting day as a button. The cell shows a short label for every type, and
 * the dialog lists the full names, so no fast is cut off or hidden.
 */
function PuasaDay({ day, isPast, isToday, puasa }: PuasaDayProps) {
  const names = puasa.recommendations.map(
    (recommendation) => recommendation.name,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex min-w-0 flex-1 flex-col gap-1.5 p-2 text-left transition-colors outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
          type="button"
        >
          <span className="sr-only">
            {format(day, "EEEE, d MMMM", { locale: id })}
            {isToday ? " (hari ini)" : ""}: {names.join(", ")}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "text-sm font-medium tabular-nums",
              isToday && "font-semibold text-foreground",
            )}
          >
            {format(day, "d")}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "flex min-w-0 flex-wrap gap-1",
              // Past fasts recede, as in the list view.
              isPast && "opacity-60",
            )}
          >
            {puasa.recommendations.map((recommendation) => (
              <Badge
                key={recommendation.key}
                className="max-w-full"
                variant="outline"
              >
                {/* Only the largest text setting can still cut a label; the
                    dialog always has the full name. */}
                <span className="truncate">
                  {getPuasaShortName(puasa, recommendation)}
                </span>
              </Badge>
            ))}
          </span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {format(day, "EEEE, d MMMM yyyy", { locale: id })}
          </DialogTitle>
          <DialogDescription>
            Puasa sunnah yang dianjurkan pada tanggal ini.
          </DialogDescription>
        </DialogHeader>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-sm">
          {names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Tutup</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
