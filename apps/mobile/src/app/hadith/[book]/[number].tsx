import { ArabicText } from "@/components/common/arabic-text";
import { EmptyState, ErrorState } from "@/components/common/state-views";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { api } from "@/lib/api";
import { copyText, shareLink } from "@/lib/share";
import { queryKeys } from "@jadwal-sholat/core/api";
import { hadithPath } from "@jadwal-sholat/core/share";
import { useQuery } from "@tanstack/react-query";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  SearchX,
  Share2,
} from "lucide-react-native";
import { ScrollView, View } from "react-native";

function DetailSkeleton() {
  return (
    <View accessibilityLabel="Memuat hadith…" className="gap-6">
      <Skeleton className="h-4 w-32" />
      <View className="items-end gap-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-4/5" />
        <Skeleton className="h-8 w-3/5" />
      </View>
      <Separator />
      <View className="gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-2/3" />
      </View>
    </View>
  );
}

function capitalize(text: string) {
  return text.slice(0, 1).toUpperCase() + text.slice(1);
}

export default function HadithDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ book: string; number: string }>();
  const book = params.book;
  const hadithNumber = Number(params.number);
  const isValidNumber = Number.isInteger(hadithNumber) && hadithNumber >= 1;

  const { data, isPending, isError, refetch } = useQuery({
    enabled: isValidNumber,
    queryKey: queryKeys.hadithDetail(book, hadithNumber),
    queryFn: ({ signal }) => api.hadithDetail(book, hadithNumber, signal),
  });

  const bookName = data?.name ?? book;
  const title = `${bookName} no. ${hadithNumber}`;
  const contents = data?.contents;
  const available = data?.available ?? 0;
  const canGoPrev = hadithNumber > 1;
  const canGoNext = available > 0 && hadithNumber < available;

  function renderContent() {
    if (!isValidNumber) {
      return (
        <EmptyState
          icon={SearchX}
          title="Nomor hadith tidak valid"
          description="Buka daftar hadith untuk memilih nomor lain."
          action={
            <Button variant="outline" onPress={() => router.replace("/hadith")}>
              <Text>Buka daftar hadith</Text>
            </Button>
          }
        />
      );
    }
    if (isPending) return <DetailSkeleton />;
    if (isError) {
      return (
        <ErrorState title="Hadith belum dapat dimuat" onRetry={() => refetch()} />
      );
    }
    if (!contents) {
      return (
        <EmptyState
          icon={SearchX}
          title="Hadith tidak ditemukan"
          description={
            available
              ? `Kitab ini memuat ${available} hadith. Coba nomor lain.`
              : "Coba nomor lain atau pilih kitab lain."
          }
          action={
            <Button variant="outline" onPress={() => router.replace("/hadith")}>
              <Text>Buka daftar hadith</Text>
            </Button>
          }
        />
      );
    }

    return (
      <View className="gap-6">
        <View className="gap-3">
          <Text variant="muted">{bookName}</Text>
          <View className="flex-row flex-wrap gap-2">
            <Button
              variant="outline"
              onPress={() =>
                shareLink({
                  excerpt: contents.id,
                  path: hadithPath(book, contents.number),
                  title,
                })
              }
            >
              <Icon as={Share2} />
              <Text>Bagikan</Text>
            </Button>
            <Button
              variant="outline"
              onPress={() =>
                copyText(
                  `${contents.arab}\n\n${capitalize(contents.id)}\n\n(${title})`,
                  "Hadith disalin",
                )
              }
            >
              <Icon as={Copy} />
              <Text>Salin</Text>
            </Button>
          </View>
        </View>

        {contents.arab ? <ArabicText size={26}>{contents.arab}</ArabicText> : null}
        {contents.arab && contents.id ? <Separator /> : null}
        {contents.id ? (
          <View className="gap-2">
            <Text className="text-xs font-medium text-muted-foreground">
              Terjemahan
            </Text>
            <Text className="text-sm leading-6">{capitalize(contents.id)}</Text>
          </View>
        ) : null}

        <View className="flex-row justify-between gap-2 border-t border-border pt-4">
          {canGoPrev ? (
            <Link
              href={{
                pathname: "/hadith/[book]/[number]",
                params: { book, number: String(hadithNumber - 1) },
              }}
              replace
              asChild
            >
              <Button variant="outline" accessibilityLabel={`Hadith no. ${hadithNumber - 1}`}>
                <Icon as={ChevronLeft} />
                <Text>Sebelumnya</Text>
              </Button>
            </Link>
          ) : (
            <View />
          )}
          {canGoNext ? (
            <Link
              href={{
                pathname: "/hadith/[book]/[number]",
                params: { book, number: String(hadithNumber + 1) },
              }}
              replace
              asChild
            >
              <Button variant="outline" accessibilityLabel={`Hadith no. ${hadithNumber + 1}`}>
                <Text>Berikutnya</Text>
                <Icon as={ChevronRight} />
              </Button>
            </Link>
          ) : null}
        </View>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: `Hadith no. ${params.number}` }} />
      <ScrollView contentContainerClassName="gap-6 p-4 pb-10">
        {renderContent()}
      </ScrollView>
    </>
  );
}
