import { ArabicText } from "@/components/common/arabic-text";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import type { Ayah } from "@jadwal-sholat/core/schemas";
import {
  Bookmark,
  BookmarkCheck,
  ClipboardCopy,
  Pause,
  Play,
  Share2,
} from "lucide-react-native";
import { memo } from "react";
import { View } from "react-native";

export const AyahItem = memo(function AyahItem({
  ayah,
  showAudio,
  showLatin,
  isPlaying,
  isLastRead,
  isLinked,
  onTogglePlay,
  onShare,
  onCopy,
  onBookmark,
}: {
  ayah: Ayah;
  showAudio: boolean;
  showLatin: boolean;
  /** This ayah is being recited right now. */
  isPlaying: boolean;
  isLastRead: boolean;
  /** Opened from a shared link (?ayat=N). */
  isLinked: boolean;
  onTogglePlay: (ayah: Ayah) => void;
  onShare: (ayah: Ayah) => void;
  onCopy: (ayah: Ayah) => void;
  onBookmark: (ayah: Ayah) => void;
}) {
  const number = ayah.number.insurah;

  return (
    // Soft highlight on the ayah being recited.
    <View className={cn("px-4", isPlaying && "bg-muted/60")}>
      <View className="gap-4 border-b border-border py-6">
        <View className="flex-row items-center justify-between gap-2">
          <View
            accessible
            accessibilityLabel={`Ayat ${number}`}
            className={cn(
              "size-8 items-center justify-center rounded-full border border-border",
              isLinked && "border-foreground",
              isPlaying && "border-primary bg-primary",
            )}
          >
            <Text
              className={cn(
                "text-xs font-medium tabular-nums",
                isPlaying && "text-primary-foreground",
              )}
            >
              {number}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            {showAudio ? (
              <Button
                variant="ghost"
                size="icon"
                accessibilityLabel={isPlaying ? `Jeda ayat ${number}` : `Putar ayat ${number}`}
                onPress={() => onTogglePlay(ayah)}
              >
                <Icon as={isPlaying ? Pause : Play} size={18} />
              </Button>
            ) : null}
            <Button
              variant="ghost"
              size="icon"
              accessibilityLabel={`Bagikan ayat ${number}`}
              onPress={() => onShare(ayah)}
            >
              <Icon as={Share2} size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              accessibilityLabel={`Salin ayat ${number}`}
              onPress={() => onCopy(ayah)}
            >
              <Icon as={ClipboardCopy} size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              accessibilityLabel={`Tandai ayat ${number} sebagai bacaan terakhir`}
              accessibilityState={{ selected: isLastRead }}
              onPress={() => onBookmark(ayah)}
            >
              <Icon as={isLastRead ? BookmarkCheck : Bookmark} size={18} />
            </Button>
          </View>
        </View>

        <ArabicText selectable>{ayah.text.ar}</ArabicText>

        <View className="gap-1">
          {showLatin ? (
            <Text selectable className="text-sm italic text-muted-foreground">
              {ayah.text.read}
            </Text>
          ) : null}
          <Text selectable className="text-sm">
            {ayah.translation.id}
          </Text>
        </View>
      </View>
    </View>
  );
});
