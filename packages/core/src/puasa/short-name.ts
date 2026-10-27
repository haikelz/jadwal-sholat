import type { PuasaDate, PuasaRecommendation } from "../schemas/puasa-sunnah";

// A calendar cell fits about 12 characters at the default text size; the full
// name stays in the day's dialog.
const SHORT_NAMES: Readonly<Record<string, string>> = {
  arafah: "Arafah",
  first_nine_dhul_hijjah: "Zulhijah",
  six_shawwal_candidate: "Syawal",
  white_days: "Ayyamul Bidh",
};

/**
 * A label short enough for a calendar cell. Monday and Thursday name the
 * weekday, and 9 Muharram is Tasu'a rather than Asyura. An unknown key falls
 * back to the API's full name, so a new fast type still shows.
 */
export function getPuasaShortName(
  puasa: PuasaDate,
  recommendation: PuasaRecommendation,
): string {
  if (recommendation.key === "monday_thursday") return puasa.weekday;
  if (recommendation.key === "ashura") {
    return puasa.hijri.day === 9 ? "Tasu'a" : "Asyura";
  }

  return SHORT_NAMES[recommendation.key] ?? recommendation.name;
}
