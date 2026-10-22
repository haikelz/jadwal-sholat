import { ArabicText } from "@/components/common/arabic-text";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { copyText } from "@/lib/share";
import { splitHighlight } from "@jadwal-sholat/core/quran";
import type { AsmaulHusna } from "@jadwal-sholat/core/schemas";
import { Copy } from "lucide-react-native";
import { View } from "react-native";

export function AsmaulHusnaRow({
  item,
  search,
}: {
  item: AsmaulHusna;
  search: string;
}) {
  return (
    <View className="flex-row items-center justify-between gap-4 border-b border-border px-1 py-3">
      <View className="min-w-0 flex-1 gap-0.5">
        <Text className="text-sm font-medium">
          <Text className="text-sm font-medium tabular-nums">{item.urutan}. </Text>
          {splitHighlight(item.latin, search).map((part, index) =>
            part.match ? (
              <Text key={index} className="bg-primary/15 text-sm font-medium">
                {part.text}
              </Text>
            ) : (
              part.text
            ),
          )}
        </Text>
        <Text variant="muted">{item.arti}</Text>
      </View>
      <View className="shrink-0 flex-row items-center gap-1">
        <ArabicText size={24}>{item.arab}</ArabicText>
        <Button
          variant="ghost"
          size="icon"
          accessibilityLabel={`Salin ${item.latin}`}
          onPress={() =>
            copyText(`${item.latin} (${item.arab}): ${item.arti}`, "Asmaul Husna disalin")
          }
        >
          <Icon as={Copy} size={16} />
        </Button>
      </View>
    </View>
  );
}
