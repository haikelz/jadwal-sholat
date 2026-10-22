import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import {
  pauseAyah,
  playAyah,
  resumeAyah,
  stopAyahs,
  useAyahPlayer,
} from "@/lib/audio/ayah-player";
import type { SurahDetail } from "@jadwal-sholat/core/schemas";
import { Pause, Play, SkipBack, SkipForward, Square } from "lucide-react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * One set of large, labeled controls for the recitation, pinned under the
 * ayah list while this surah has an ayah queued.
 */
export function AudioBar({ surah, qori }: { surah: SurahDetail; qori: number }) {
  const insets = useSafeAreaInsets();
  const playingSurah = useAyahPlayer((state) => state.surah);
  const index = useAyahPlayer((state) => state.index);
  const playing = useAyahPlayer((state) => state.playing);

  if (playingSurah !== surah.number || index === null) return null;

  const ayahNumber = surah.ayahs[index]?.number.insurah ?? index + 1;
  const isFirst = index === 0;
  const isLast = index === surah.ayahs.length - 1;

  return (
    <View
      accessibilityLabel="Kontrol audio"
      className="gap-2 border-t border-border bg-background px-4 pt-3"
      style={{ paddingBottom: insets.bottom + 12 }}
    >
      <View className="flex-row items-center justify-between gap-2">
        <Text
          numberOfLines={1}
          accessibilityLiveRegion="polite"
          className="min-w-0 flex-1 text-sm font-medium"
        >
          {playing ? "Diputar" : "Dijeda"} · QS. {surah.asma.id.short}: {ayahNumber}
        </Text>
        <Button variant="ghost" accessibilityLabel="Berhenti memutar audio" onPress={stopAyahs}>
          <Icon as={Square} size={16} />
          <Text>Berhenti</Text>
        </Button>
      </View>
      <View className="flex-row flex-wrap gap-2">
        <Button
          variant="outline"
          disabled={isFirst}
          accessibilityLabel="Mundur ke ayat sebelumnya"
          onPress={() => playAyah(surah, index - 1, qori)}
        >
          <Icon as={SkipBack} size={18} />
          <Text>Mundur</Text>
        </Button>
        <Button
          accessibilityLabel={playing ? "Jeda audio" : "Putar audio"}
          onPress={playing ? pauseAyah : resumeAyah}
        >
          <Icon as={playing ? Pause : Play} size={18} />
          <Text>{playing ? "Jeda" : "Putar"}</Text>
        </Button>
        <Button
          variant="outline"
          disabled={isLast}
          accessibilityLabel="Lanjut ke ayat berikutnya"
          onPress={() => playAyah(surah, index + 1, qori)}
        >
          <Icon as={SkipForward} size={18} />
          <Text>Lanjut</Text>
        </Button>
      </View>
    </View>
  );
}
