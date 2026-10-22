import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { SURAH_LIST } from "@jadwal-sholat/core/data";
import { LAST_SURAH } from "@jadwal-sholat/core/quran";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { Pressable, View } from "react-native";

function surahName(number: number) {
  return SURAH_LIST.find((surah) => surah.number === number)?.asma.id.short;
}

/** Links to the previous and next surah at the end of a surah. */
export function SurahPager({
  number,
  onNavigate,
}: {
  number: number;
  onNavigate: (number: number) => void;
}) {
  const previous = number > 1 ? number - 1 : null;
  const next = number < LAST_SURAH ? number + 1 : null;

  return (
    <View
      accessibilityLabel="Navigasi surat"
      className={cn(
        "flex-row gap-2 px-4 pt-4",
        previous ? "justify-between" : "justify-end",
      )}
    >
      {previous ? (
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={`Surat sebelumnya, ${surahName(previous) ?? previous}`}
          onPress={() => onNavigate(previous)}
          className="items-start gap-0.5 rounded-lg px-3 py-2 active:bg-muted/50"
        >
          <Text className="text-sm text-muted-foreground">Surat sebelumnya</Text>
          <View className="flex-row items-center gap-1">
            <Icon as={ArrowLeft} size={16} />
            <Text className="text-sm font-medium">
              {surahName(previous) ?? `Surat ${previous}`}
            </Text>
          </View>
        </Pressable>
      ) : null}
      {next ? (
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={`Surat berikutnya, ${surahName(next) ?? next}`}
          onPress={() => onNavigate(next)}
          className="items-end gap-0.5 rounded-lg px-3 py-2 active:bg-muted/50"
        >
          <Text className="text-sm text-muted-foreground">Surat berikutnya</Text>
          <View className="flex-row items-center gap-1">
            <Text className="text-sm font-medium">
              {surahName(next) ?? `Surat ${next}`}
            </Text>
            <Icon as={ArrowRight} size={16} />
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}
