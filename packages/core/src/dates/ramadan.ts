/**
 * Hijri year of this Ramadan, or of the next one once this year's has ended.
 * Uses the Umm al-Qura calendar, an estimate: Kemenag fixes the first day of
 * Ramadan by sidang isbat, which can differ by a day.
 */
export function ramadanHijriYear(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
    month: "numeric",
    year: "numeric",
  }).formatToParts(date);
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value.replace(/\D/g, ""));
  const RAMADAN = 9;
  return value("month") > RAMADAN ? value("year") + 1 : value("year");
}
