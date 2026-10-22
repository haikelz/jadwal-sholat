import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { api } from "@/lib/api";
import { useLastRead } from "@/store/last-read";
import { queryKeys } from "@jadwal-sholat/core/api";
import { formatToIndonesianDate } from "@jadwal-sholat/core/dates";
import { findNextFast } from "@jadwal-sholat/core/puasa";
import { useQuery } from "@tanstack/react-query";
import { Link, type Href } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Pressable, View } from "react-native";

function ShortcutRow({
  href,
  label,
  value,
}: {
  href: Href;
  label: string;
  value: string;
}) {
  return (
    <Link href={href} asChild>
      <Pressable
        accessibilityRole="link"
        className="min-h-14 flex-row items-center justify-between gap-3 border-b border-border px-1 py-3 active:bg-muted/50"
      >
        <View className="min-w-0 flex-1">
          <Text className="text-xs text-muted-foreground">{label}</Text>
          <Text numberOfLines={1} className="text-sm font-medium">
            {value}
          </Text>
        </View>
        <Icon as={ChevronRight} size={16} className="text-muted-foreground" />
      </Pressable>
    </Link>
  );
}

/**
 * Quiet links from the schedule into the rest of the app: where the reader
 * stopped in the Qur'an and the next sunnah fast. Each row hides itself when
 * it has nothing to show.
 */
export function HomeShortcuts({
  month,
  todayIso,
}: {
  /** "yyyy-MM" */
  month: string;
  /** "yyyy-MM-dd" */
  todayIso: string;
}) {
  const lastRead = useLastRead((state) => state.lastRead);
  // Same key as the Puasa tab, so both share one cached response.
  const { data } = useQuery({
    queryKey: queryKeys.puasaSchedule(month),
    queryFn: ({ signal }) => api.puasaSchedule(month, signal),
  });
  const nextFast = data ? findNextFast(data.dates, todayIso) : undefined;

  if (!lastRead && !nextFast) return null;

  return (
    <View accessibilityLabel="Pintasan" className="border-t border-border">
      {lastRead ? (
        <ShortcutRow
          href={{
            pathname: "/quran/[number]",
            params: { ayat: String(lastRead.ayah), number: String(lastRead.surah) },
          }}
          label="Lanjutkan membaca"
          value={`${lastRead.name} · ayat ${lastRead.ayah}`}
        />
      ) : null}
      {nextFast ? (
        <ShortcutRow
          href="/sunnah-fasting"
          label="Puasa berikutnya"
          value={`${formatToIndonesianDate(nextFast.date) ?? nextFast.date.slice(0, 10)} · ${nextFast.recommendations
            .map((recommendation) => recommendation.name)
            .join(", ")}`}
        />
      ) : null}
    </View>
  );
}
