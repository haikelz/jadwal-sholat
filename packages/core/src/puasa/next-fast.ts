import type { PuasaDate } from "../schemas/puasa-sunnah";
import type { PuasaTypeFilter } from "./puasa-types";

/**
 * Keeps the dates that have the selected fast, and on each date only the
 * matching recommendations. "all" leaves the list unchanged.
 */
export function filterPuasaDates(
  dates: readonly PuasaDate[],
  type: PuasaTypeFilter,
): PuasaDate[] {
  if (type === "all") return [...dates];

  return dates
    .filter((puasa) =>
      puasa.recommendations.some((recommendation) => recommendation.key === type),
    )
    .map((puasa) => ({
      ...puasa,
      recommendations: puasa.recommendations.filter(
        (recommendation) => recommendation.key === type,
      ),
    }));
}

/** The first fast on or after `todayIso` ("yyyy-MM-dd"), if any. */
export function findNextFast(
  dates: readonly PuasaDate[],
  todayIso: string,
): PuasaDate | undefined {
  return dates.find((puasa) => puasa.date.slice(0, 10) >= todayIso);
}
