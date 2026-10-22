import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { Toggle } from "@/components/ui/toggle";
import { qoriOptions } from "@jadwal-sholat/core/quran";
import { Languages, MessageSquare, Volume2 } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, ToastAndroid, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const QORI_ITEMS = qoriOptions.map((qori) => ({
  label: `${qori.id}. ${qori.name}`,
  value: String(qori.id),
}));

/** Audio, Latin, tafsir, reciter and jump-to-ayah controls for a surah. */
export function ReadingToolbar({
  ayahCount,
  qori,
  showAudio,
  showLatin,
  onJump,
  onOpenTafsir,
  onQoriChange,
  onShowAudioChange,
  onShowLatinChange,
}: {
  ayahCount: number;
  qori: number;
  showAudio: boolean;
  showLatin: boolean;
  /** Zero-based index of the ayah to scroll to. */
  onJump: (index: number) => void;
  onOpenTafsir: () => void;
  onQoriChange: (qori: number) => void;
  onShowAudioChange: (showAudio: boolean) => void;
  onShowLatinChange: (showLatin: boolean) => void;
}) {
  const insets = useSafeAreaInsets();
  const [jumpTo, setJumpTo] = useState("");
  const selected = QORI_ITEMS.find((item) => item.value === String(qori));

  function jump() {
    const ayah = Number(jumpTo);
    if (!Number.isInteger(ayah) || ayah < 1 || ayah > ayahCount) {
      ToastAndroid.show(`Masukkan nomor ayat 1–${ayahCount}`, ToastAndroid.SHORT);
      return;
    }
    onJump(ayah - 1);
  }

  return (
    <View
      accessibilityLabel="Pengaturan bacaan"
      className="gap-2 border-b border-border py-3"
    >
      <View className="flex-row flex-wrap gap-2">
        <Toggle
          variant="outline"
          pressed={showAudio}
          onPressedChange={onShowAudioChange}
          accessibilityLabel="Tampilkan tombol audio"
        >
          <Icon as={Volume2} size={16} />
          <Text>Audio</Text>
        </Toggle>
        <Toggle
          variant="outline"
          pressed={showLatin}
          onPressedChange={onShowLatinChange}
          accessibilityLabel="Tampilkan bacaan Latin"
        >
          <Icon as={Languages} size={16} />
          <Text>Latin</Text>
        </Toggle>
        <Button variant="outline" onPress={onOpenTafsir}>
          <Icon as={MessageSquare} size={16} />
          <Text>Tafsir</Text>
        </Button>
      </View>

      <View className="flex-row items-center gap-2">
        <Select
          value={selected}
          onValueChange={(option) => {
            if (option) onQoriChange(Number(option.value));
          }}
        >
          <SelectTrigger accessibilityLabel="Pilih qori" className="min-w-0 flex-1">
            <SelectValue placeholder="Pilih qori" />
          </SelectTrigger>
          <SelectContent
            className="w-72"
            insets={{
              bottom: insets.bottom + 24,
              left: 12,
              right: 12,
              top: insets.top,
            }}
          >
            <ScrollView className="max-h-72">
              {QORI_ITEMS.map((item) => (
                <SelectItem key={item.value} label={item.label} value={item.value} />
              ))}
            </ScrollView>
          </SelectContent>
        </Select>
        <Input
          accessibilityLabel="Lompat ke ayat"
          placeholder="Ayat"
          keyboardType="number-pad"
          returnKeyType="go"
          className="w-20"
          value={jumpTo}
          onChangeText={setJumpTo}
          onSubmitEditing={jump}
        />
        <Button variant="outline" accessibilityLabel="Buka ayat" onPress={jump}>
          <Text>Buka</Text>
        </Button>
      </View>
    </View>
  );
}
