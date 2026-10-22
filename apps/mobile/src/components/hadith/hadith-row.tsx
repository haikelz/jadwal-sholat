import { ArabicText } from "@/components/common/arabic-text";
import { Text } from "@/components/ui/text";
import type { Hadith } from "@jadwal-sholat/core/schemas";
import { Link } from "expo-router";
import { Pressable } from "react-native";

export function HadithRow({
  book,
  bookName,
  hadith,
}: {
  book: string;
  bookName: string;
  hadith: Hadith;
}) {
  const title = `${bookName} no. ${hadith.number}`;

  return (
    <Link
      href={{
        pathname: "/hadith/[book]/[number]",
        params: { book, number: String(hadith.number) },
      }}
      asChild
    >
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={`${title}. ${hadith.id}`}
        className="gap-2 border-b border-border px-1 py-4 active:bg-muted/50"
      >
        <Text className="text-sm font-medium">{title}</Text>
        {hadith.arab ? (
          <ArabicText size={22} numberOfLines={2}>
            {hadith.arab}
          </ArabicText>
        ) : null}
        <Text variant="muted" numberOfLines={2}>
          {hadith.id}
        </Text>
      </Pressable>
    </Link>
  );
}
