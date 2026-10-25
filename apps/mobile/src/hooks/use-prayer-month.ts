import { queryKeys } from "@jadwal-sholat/core/api";
import { getDateParts, zonedNow } from "@jadwal-sholat/core/dates";
import { getTomorrowTimings } from "@jadwal-sholat/core/prayer";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { api } from "@/lib/api";
import { useLocation } from "@/store/location";
import { useStoredSchedule } from "@/store/stored-schedule";

/**
 * This month's prayer times for the saved position, falling back to the
 * stored copy offline. On the last day of a month it also loads the next
 * month, so "tomorrow" is never missing.
 */
export function usePrayerMonth(now: Date, enabled = true) {
  const position = useLocation((state) => state.position);
  const stored = useStoredSchedule((state) => state.schedule);
  const setSchedule = useStoredSchedule((state) => state.setSchedule);

  const today = getDateParts(now);
  const month = `${today.tahun}-${today.bulan}`;
  const place = `${position.lat},${position.lng}`;

  const query = useQuery({
    enabled,
    queryKey: queryKeys.prayerMonth(today.tahun, today.bulan, position),
    queryFn: ({ signal }) =>
      api.prayerMonth({ month: today.bulan, position, year: today.tahun }, signal),
  });

  useEffect(() => {
    if (query.data) setSchedule({ days: query.data, month, place });
  }, [month, place, query.data, setSchedule]);

  const storedDays = stored?.month === month ? stored.days : undefined;
  const days = query.data ?? storedDays ?? [];

  // Read the month on the location's own clock: the API names its timezone,
  // so a place picked in another zone gets the right day and countdown.
  // ponytail: the month is fetched by the device's date, so around midnight
  // on a month's last day a location in another zone can miss "today" for up
  // to two hours. Upgrade path: refetch by the zoned month.
  const timeZone = days[0]?.meta?.timezone;
  const clock = timeZone ? zonedNow(now, timeZone) : now;
  const localToday = getDateParts(clock);
  const todayIndex = days.findIndex(
    (day) => day.date.gregorian.date === localToday.matchDate,
  );
  const isLastDay = todayIndex >= 0 && todayIndex === days.length - 1;

  const next = getDateParts(new Date(now.getFullYear(), now.getMonth() + 1, 1));
  const nextMonth = useQuery({
    enabled: enabled && isLastDay,
    queryKey: queryKeys.prayerMonth(next.tahun, next.bulan, position),
    queryFn: ({ signal }) =>
      api.prayerMonth({ month: next.bulan, position, year: next.tahun }, signal),
  });

  return {
    ...query,
    /** `now` on the location's clock: use it for "next prayer" and countdowns. */
    clock,
    days,
    today: localToday,
    todayIndex,
    todayTimings: days[todayIndex]?.timings,
    tomorrowTimings: getTomorrowTimings(days, todayIndex, nextMonth.data),
    isShowingStored: !query.data && storedDays !== undefined,
  };
}
