import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { formatSholatTime, PRAYERS } from "@jadwal-sholat/core/prayer";
import type { PrayerDay } from "@jadwal-sholat/core/schemas";
import { format } from "date-fns/format";
import { id } from "date-fns/locale/id";
import { parse } from "date-fns/parse";
import { useState } from "react";
import { View } from "react-native";

// Today ±2 days until the reader asks for the whole month.
const AROUND_TODAY = 2;

function dayLabel(gregorian: string) {
  return format(parse(gregorian, "dd-MM-yyyy", new Date()), "EEE, d", {
    locale: id,
  });
}

/** The month as a compact table: date and the five prayers. */
export function MonthSchedule({
  days,
  todayIndex,
  title,
}: {
  days: readonly PrayerDay[];
  todayIndex: number;
  title: string;
}) {
  const [showFullMonth, setShowFullMonth] = useState(false);
  const center = Math.max(todayIndex, 0);
  const rows = showFullMonth
    ? days
    : days.slice(Math.max(center - AROUND_TODAY, 0), center + AROUND_TODAY + 1);

  return (
    <View className="gap-3">
      <View className="flex-row items-baseline justify-between gap-2">
        <Text variant="large" accessibilityRole="header">
          {title}
        </Text>
        <Text variant="muted">Hari ini ditandai</Text>
      </View>

      <View className="overflow-hidden rounded-lg border border-border">
        <View className="flex-row bg-muted px-3 py-2">
          <Text className="flex-[1.4] text-xs text-muted-foreground">Tanggal</Text>
          {PRAYERS.map((prayer) => (
            <Text
              key={prayer.key}
              className="flex-1 text-right text-xs text-muted-foreground"
            >
              {prayer.name}
            </Text>
          ))}
        </View>
        {rows.map((day) => {
          const isToday = day === days[todayIndex];
          return (
            <View
              key={day.date.gregorian.date}
              accessible
              accessibilityLabel={`${dayLabel(day.date.gregorian.date)}${isToday ? ", hari ini" : ""}: ${PRAYERS.map((prayer) => `${prayer.name} ${formatSholatTime(day.timings[prayer.key])}`).join(", ")}`}
              className={cn(
                "flex-row border-t border-border px-3 py-2.5",
                isToday && "bg-accent",
              )}
            >
              <Text
                numberOfLines={1}
                className={cn("flex-[1.4] text-sm", isToday && "font-semibold")}
              >
                {dayLabel(day.date.gregorian.date)}
              </Text>
              {PRAYERS.map((prayer) => (
                <Text
                  key={prayer.key}
                  className={cn(
                    "flex-1 text-right text-sm tabular-nums",
                    isToday && "font-semibold",
                  )}
                >
                  {formatSholatTime(day.timings[prayer.key])}
                </Text>
              ))}
            </View>
          );
        })}
      </View>

      <Button
        variant="ghost"
        className="self-start"
        accessibilityState={{ expanded: showFullMonth }}
        onPress={() => setShowFullMonth((value) => !value)}
      >
        <Text>
          {showFullMonth ? "Tampilkan sekitar hari ini" : "Lihat sebulan penuh"}
        </Text>
      </Button>
    </View>
  );
}
