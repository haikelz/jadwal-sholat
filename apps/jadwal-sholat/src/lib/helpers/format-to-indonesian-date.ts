import { format, parse } from "date-fns";
import { id } from "date-fns/locale";

export function formatToIndonesianDate(dateString: string): string | null {
  try {
    const parsedDate = parse(dateString, "EEEE, dd MMMM yyyy", new Date());
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date");
    }
    return format(parsedDate, "EEEE, d MMMM yyyy", { locale: id });
  } catch (error) {
    console.error("Error converting date:", error);
    return null;
  }
}
