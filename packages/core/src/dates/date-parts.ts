import { format } from "date-fns/format";
import { id } from "date-fns/locale/id";

/** The date strings the apps match against API data, for a given moment. */
export function getDateParts(date: Date) {
  return {
    tahun: format(date, "yyyy"),
    bulan: format(date, "MM"),
    /** Same shape as `date.gregorian.date` in the prayer-time API. */
    matchDate: format(date, "dd-MM-yyyy"),
    /** Same shape as `date` in the puasa sunnah API. */
    isoDate: format(date, "yyyy-MM-dd"),
    currentDate: format(date, "dd MMMM yyyy", { locale: id }),
    currentDateWithDayOfWeek: format(date, "EEEE, d MMMM yyyy", { locale: id }),
  };
}
