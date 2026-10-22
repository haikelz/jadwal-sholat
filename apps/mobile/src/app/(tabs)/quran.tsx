import { EmptyState } from "@/components/common/state-views";
import { SURAH_ROW_HEIGHT, SurahRow } from "@/components/quran/surah-row";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLastRead } from "@/store/last-read";
import { SURAH_LIST } from "@jadwal-sholat/core/data";
import {
  filterSurahs,
  SURAH_TYPE_OPTIONS,
  type SurahTypeFilter,
} from "@jadwal-sholat/core/quran";
import { Link } from "expo-router";
import {
  ArrowDown,
  ArrowUp,
  BookOpenText,
  ChevronRight,
  SearchX,
} from "lucide-react-native";
import { useDeferredValue, useMemo, useState } from "react";
import { FlatList, Pressable, View } from "react-native";

export default function QuranScreen() {
  const lastRead = useLastRead((state) => state.lastRead);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<SurahTypeFilter>("all");
  const [ascending, setAscending] = useState(true);
  const deferredSearch = useDeferredValue(search);

  const surahs = useMemo(
    () => filterSurahs(SURAH_LIST, { ascending, search: deferredSearch, type }),
    [ascending, deferredSearch, type],
  );

  return (
    <View className="flex-1">
      <View className="gap-3 px-4 pb-3 pt-4">
        {lastRead ? (
          <Link
            href={{
              pathname: "/quran/[number]",
              params: { ayat: String(lastRead.ayah), number: String(lastRead.surah) },
            }}
            asChild
          >
            <Pressable
              accessibilityRole="link"
              className="min-h-14 flex-row items-center gap-3 rounded-md bg-muted px-3 py-2 active:bg-accent"
            >
              <Icon as={BookOpenText} size={18} />
              <View className="min-w-0 flex-1">
                <Text className="text-xs text-muted-foreground">
                  Lanjutkan membaca
                </Text>
                <Text numberOfLines={1} className="text-sm font-medium">
                  {lastRead.name} · ayat {lastRead.ayah}
                </Text>
              </View>
              <Icon as={ChevronRight} size={16} className="text-muted-foreground" />
            </Pressable>
          </Link>
        ) : null}

        <Input
          accessibilityLabel="Cari surat"
          placeholder="Cari surat, contoh: Al-Kahf"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          value={search}
          onChangeText={setSearch}
        />

        <View className="flex-row items-center justify-between gap-2">
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            accessibilityLabel="Jenis surat"
            value={type}
            // A second tap on the selected filter keeps it selected.
            onValueChange={(value) => {
              if (value) setType(value as SurahTypeFilter);
            }}
          >
            {SURAH_TYPE_OPTIONS.map((option, index) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                isFirst={index === 0}
                isLast={index === SURAH_TYPE_OPTIONS.length - 1}
                accessibilityLabel={`Tampilkan surat ${option.label}`}
              >
                <Text>{option.label}</Text>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Button
            variant="outline"
            size="icon"
            accessibilityLabel={`Urutkan: ${ascending ? "naik" : "turun"}`}
            onPress={() => setAscending((value) => !value)}
          >
            <Icon as={ascending ? ArrowUp : ArrowDown} size={16} />
          </Button>
        </View>
      </View>

      <FlatList
        data={surahs}
        keyExtractor={(surah) => String(surah.number)}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        getItemLayout={(_, index) => ({
          index,
          length: SURAH_ROW_HEIGHT,
          offset: SURAH_ROW_HEIGHT * index,
        })}
        contentContainerClassName="px-4 pb-10"
        renderItem={({ item }) => <SurahRow surah={item} search={deferredSearch} />}
        ListEmptyComponent={
          <EmptyState
            icon={SearchX}
            title="Surat tidak ditemukan"
            description="Coba kata kunci lain atau tampilkan semua surat."
            action={
              <Button
                variant="outline"
                onPress={() => {
                  setSearch("");
                  setType("all");
                }}
              >
                <Text>Tampilkan semua</Text>
              </Button>
            }
          />
        }
      />
    </View>
  );
}
