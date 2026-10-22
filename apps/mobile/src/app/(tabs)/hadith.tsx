import {
  EmptyState,
  ErrorState,
  ListSkeleton,
} from "@/components/common/state-views";
import { HadithRow } from "@/components/hadith/hadith-row";
import { OptionSelect } from "@/components/puasa/option-select";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { api } from "@/lib/api";
import { nextHadithPage, queryKeys } from "@jadwal-sholat/core/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { BookOpen, Search } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

// Same default as the web.
const DEFAULT_BOOK = "bukhari";

export default function HadithScreen() {
  const router = useRouter();
  const [pickedBook, setPickedBook] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [outOfRange, setOutOfRange] = useState(false);

  const books = useQuery({
    queryKey: queryKeys.hadithBooks(),
    queryFn: ({ signal }) => api.hadithBooks(signal),
  });
  // Bukhari loads alongside the book list; another book only if it's missing.
  const book =
    pickedBook ??
    (!books.data?.length || books.data.some((item) => item.id === DEFAULT_BOOK)
      ? DEFAULT_BOOK
      : books.data[0].id);
  const {
    data,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: queryKeys.hadithPages(book),
    queryFn: ({ pageParam, signal }) => api.hadithPage(book, pageParam, signal),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      nextHadithPage(lastPage.available, allPages.length),
  });

  const bookMeta = books.data?.find((item) => item.id === book);
  const firstPage = data?.pages[0];
  const bookName = bookMeta?.name ?? firstPage?.name ?? book;
  const available = bookMeta?.available ?? firstPage?.available ?? 0;
  const hadiths = data?.pages.flatMap((page) => page.hadiths) ?? [];

  // Numbers jump straight to the hadith instead of filtering loaded pages.
  function submitSearch() {
    const number = Number.parseInt(search, 10);
    if (Number.isNaN(number)) return;
    if (number < 1 || number > available) {
      setOutOfRange(true);
      return;
    }
    setOutOfRange(false);
    router.push({
      pathname: "/hadith/[book]/[number]",
      params: { book, number: String(number) },
    });
  }

  function renderEmpty() {
    if (isPending) return <ListSkeleton label="Memuat hadith…" rowClassName="h-28" />;
    if (isError) {
      return (
        <ErrorState title="Hadith belum dapat dimuat" onRetry={() => refetch()} />
      );
    }
    return (
      <EmptyState
        icon={BookOpen}
        title="Hadith belum tersedia"
        description="Kitab ini belum memiliki hadith. Coba kitab lain."
        action={
          <Button variant="outline" onPress={() => refetch()}>
            <Text>Muat ulang</Text>
          </Button>
        }
      />
    );
  }

  return (
    <View className="flex-1">
      <View className="gap-3 px-4 pb-3 pt-4">
        <View className="flex-row gap-2">
          <Input
            className="flex-1"
            accessibilityLabel="Cari nomor hadith"
            placeholder="Cari nomor hadith"
            keyboardType="number-pad"
            returnKeyType="search"
            value={search}
            onChangeText={(text) => {
              setSearch(text.replace(/\D/g, ""));
              setOutOfRange(false);
            }}
            onSubmitEditing={submitSearch}
          />
          <Button size="icon" accessibilityLabel="Buka hadith" onPress={submitSearch}>
            <Icon as={Search} />
          </Button>
        </View>
        {outOfRange ? (
          <Text variant="muted">
            {available
              ? `Kitab ini memuat ${available} hadith. Coba nomor lain.`
              : "Nomor ini tidak ada. Coba nomor lain."}
          </Text>
        ) : null}
        {books.isError ? (
          <ErrorState
            title="Daftar kitab belum dapat dimuat"
            onRetry={() => books.refetch()}
          />
        ) : (
          <OptionSelect
            label="Pilih kitab"
            options={(books.data ?? []).map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            value={book}
            onValueChange={(value) => {
              setPickedBook(value);
              setOutOfRange(false);
            }}
          />
        )}
      </View>

      <FlatList
        data={hadiths}
        keyExtractor={(hadith) => `${book}-${hadith.number}`}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="px-4 pb-10"
        ListHeaderComponent={hadiths.length ? <View className="border-b border-border" /> : null}
        ListEmptyComponent={renderEmpty()}
        renderItem={({ item }) => (
          <HadithRow book={book} bookName={bookName} hadith={item} />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="flex-row items-center justify-center gap-2 py-6">
              <ActivityIndicator size="small" />
              <Text variant="muted">Memuat hadith berikutnya…</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
