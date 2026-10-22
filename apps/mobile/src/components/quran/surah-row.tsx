import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { splitHighlight } from "@jadwal-sholat/core/quran";
import type { SurahListItem } from "@jadwal-sholat/core/schemas";
import { Link } from "expo-router";
import { memo } from "react";
import { Pressable, View } from "react-native";

// ponytail: a fixed row height lets the list skip measuring 114 rows
// (getItemLayout). Very large system font sizes can crowd the two lines.
export const SURAH_ROW_HEIGHT = 64;

function Dot() {
  return <View className="size-1 rounded-full bg-muted-foreground/40" />;
}

export const SurahRow = memo(function SurahRow({
  surah,
  search,
}: {
  surah: SurahListItem;
  search: string;
}) {
  return (
    <Link
      href={{
        pathname: "/quran/[number]",
        params: { number: String(surah.number) },
      }}
      asChild
    >
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={`${surah.number}. ${surah.asma.id.short}, ${surah.asma.translation.id}, ${surah.ayahCount} ayat, ${surah.type.id}`}
        style={{ height: SURAH_ROW_HEIGHT }}
        className="flex-row items-center gap-3 border-b border-border px-2 active:bg-muted/50"
      >
        <Text className="w-8 text-sm text-muted-foreground tabular-nums">
          {surah.number}
        </Text>
        <View className="min-w-0 flex-1 gap-0.5">
          <Text numberOfLines={1} className="text-sm font-medium">
            {splitHighlight(surah.asma.id.short, search).map((part, index) =>
              part.match ? (
                <Text key={index} className="bg-primary/15 text-sm font-medium">
                  {part.text}
                </Text>
              ) : (
                part.text
              ),
            )}
          </Text>
          <View className="flex-row items-center gap-2">
            <Text
              numberOfLines={1}
              className="shrink text-xs text-muted-foreground"
            >
              {surah.asma.translation.id}
            </Text>
            <Dot />
            <Text className="text-xs text-muted-foreground tabular-nums">
              {surah.ayahCount} ayat
            </Text>
          </View>
        </View>
        <Badge variant="outline">
          <Text>{surah.type.id}</Text>
        </Badge>
      </Pressable>
    </Link>
  );
});
