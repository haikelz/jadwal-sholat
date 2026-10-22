import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import {
  DAY_TIMES,
  formatSholatTime,
  type PrayerKey,
} from "@jadwal-sholat/core/prayer";
import type { PrayerTimings } from "@jadwal-sholat/core/schemas";
import { Check } from "lucide-react-native";
import { View } from "react-native";

/**
 * Today's eight times in a 2×4 grid. The next prayer carries a "Berikutnya"
 * badge and passed prayers a check, so the state never relies on color alone.
 */
export function TodayTimes({
  timings,
  nextKey,
  nowTime,
}: {
  timings: PrayerTimings;
  nextKey?: PrayerKey;
  /** The current time as "HH.mm", to mute times that have passed. */
  nowTime: string;
}) {
  return (
    <View
      accessibilityLabel="Waktu sholat hari ini"
      className="flex-row flex-wrap border-y border-border py-2"
    >
      {DAY_TIMES.map((prayer) => {
        const time = formatSholatTime(timings[prayer.key]);
        const isNext = prayer.key === nextKey;
        const hasPassed = !isNext && time <= nowTime;
        return (
          <View
            key={prayer.key}
            accessible
            accessibilityLabel={`${prayer.name} ${time}${isNext ? ", berikutnya" : hasPassed ? ", sudah lewat" : ""}`}
            className={cn(
              "w-1/2 flex-row flex-wrap items-center justify-between gap-1 rounded-md px-3 py-3",
              isNext && "bg-muted",
            )}
          >
            <View className="gap-0.5">
              <Text
                numberOfLines={1}
                className={cn(
                  "text-sm",
                  isNext ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {prayer.name}
              </Text>
              <Text
                className={cn(
                  "text-lg tabular-nums",
                  isNext ? "font-semibold" : "font-medium",
                  hasPassed && "text-muted-foreground",
                )}
              >
                {time}
              </Text>
            </View>
            {/* State in words and icons too, never only color. */}
            {isNext ? (
              <Badge>
                <Text>Berikutnya</Text>
              </Badge>
            ) : hasPassed ? (
              <Icon as={Check} size={16} className="text-muted-foreground" />
            ) : null}
          </View>
        );
      })}
    </View>
  );
}
