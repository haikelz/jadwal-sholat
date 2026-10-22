import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { formatToIndonesianDate } from "@jadwal-sholat/core/dates";
import type { PuasaDate } from "@jadwal-sholat/core/schemas";
import { View } from "react-native";

// ponytail: Indonesian Hijri month names live here until a second screen
// needs them; then move them next to INDONESIAN_MONTHS in core/dates.
const HIJRI_MONTHS = [
  "Muharram",
  "Safar",
  "Rabiulawal",
  "Rabiulakhir",
  "Jumadilawal",
  "Jumadilakhir",
  "Rajab",
  "Syakban",
  "Ramadan",
  "Syawal",
  "Zulkaidah",
  "Zulhijah",
];

export function PuasaRow({
  puasa,
  todayIso,
}: {
  puasa: PuasaDate;
  /** "yyyy-MM-dd"; earlier dates recede as already past. */
  todayIso: string;
}) {
  const day = puasa.date.slice(0, 10);
  const isToday = day === todayIso;
  const isPast = day < todayIso;
  const date = formatToIndonesianDate(puasa.date) ?? day;
  const hijri = `${puasa.hijri.day} ${HIJRI_MONTHS[puasa.hijri.month - 1] ?? puasa.hijri.month} ${puasa.hijri.year} H`;
  const names = puasa.recommendations.map((recommendation) => recommendation.name);

  return (
    <View
      accessible
      accessibilityLabel={`${date}${isToday ? ", hari ini" : ""}, ${hijri}: ${names.join(", ")}`}
      className={cn(
        "gap-2 border-b border-border px-1 py-3",
        isToday && "bg-accent",
      )}
    >
      <View className="flex-row flex-wrap items-center gap-2">
        <Text
          className={cn("text-sm font-medium", isPast && "text-muted-foreground")}
        >
          {date}
        </Text>
        {isToday ? (
          <Badge>
            <Text>Hari ini</Text>
          </Badge>
        ) : null}
      </View>
      <Text className="text-xs text-muted-foreground">{hijri}</Text>
      <View className={cn("flex-row flex-wrap gap-1", isPast && "opacity-60")}>
        {puasa.recommendations.map((recommendation) => (
          <Badge key={recommendation.key} variant="outline">
            <Text>{recommendation.name}</Text>
          </Badge>
        ))}
      </View>
    </View>
  );
}
