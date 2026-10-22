import { format } from "date-fns/format";
import { id } from "date-fns/locale/id";
import { parseISO } from "date-fns/parseISO";

/** "2026-10-22" → "Kamis, 22 Oktober 2026", or null for an invalid date. */
export function formatToIndonesianDate(dateString: string): string | null {
  const parsedDate = parseISO(dateString);
  if (Number.isNaN(parsedDate.getTime())) return null;

  return format(parsedDate, "EEEE, d MMMM yyyy", { locale: id });
}
