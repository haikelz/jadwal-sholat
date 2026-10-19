import { format } from "date-fns";
import { id } from "date-fns/locale";

/** The date strings the app matches against API data, for a given moment. */
export function getDateParts(date: Date) {
  return {
    tahun: format(date, "yyyy"),
    bulan: format(date, "MM"),
    /** Same shape as `date.gregorian.date` in the prayer-time API. */
    matchDate: format(date, "dd-MM-yyyy"),
    currentDate: format(date, "dd MMMM yyyy", { locale: id }),
    currentDateWithDayOfWeek: format(date, "EEEE, d MMMM yyyy", { locale: id }),
  };
}
