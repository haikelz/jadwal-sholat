import { ArabicText } from "@/components/common/arabic-text";
import { Text } from "@/components/ui/text";
import type { SurahDetail } from "@jadwal-sholat/core/schemas";
import { View } from "react-native";

function Dot() {
  return <View className="size-1 rounded-full bg-muted-foreground/40" />;
}

/** Centered, mushaf-style surah header, then the bismillah when it has one. */
export function SurahHeader({ surah }: { surah: SurahDetail }) {
  return (
    <View className="items-center gap-1">
      <ArabicText size={36} className="text-center">
        {surah.asma.ar.short}
      </ArabicText>
      <Text accessibilityRole="header" className="text-xl font-semibold tracking-tight">
        {surah.asma.id.short}
      </Text>
      <View className="flex-row flex-wrap items-center justify-center gap-x-2">
        <Text variant="muted">{surah.asma.translation.id}</Text>
        <Dot />
        <Text variant="muted">{surah.type.id}</Text>
        <Dot />
        <Text variant="muted" className="tabular-nums">
          {surah.ayahCount} ayat
        </Text>
      </View>
      {surah.preBismillah ? (
        <View className="items-center gap-1 pt-4">
          <ArabicText size={28} className="text-center">
            {surah.preBismillah.text.ar}
          </ArabicText>
          <Text variant="muted" className="text-center">
            {surah.preBismillah.translation.id}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
