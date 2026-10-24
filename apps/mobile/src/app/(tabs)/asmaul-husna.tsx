import { AsmaulHusnaRow } from "@/components/asmaul-husna/asmaul-husna-row";
import { EmptyState } from "@/components/common/state-views";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { ASMAUL_HUSNA } from "@jadwal-sholat/core/data";
import { ArrowDown, ArrowUp, SearchX } from "lucide-react-native";
import { useDeferredValue, useMemo, useState } from "react";
import { FlatList, View } from "react-native";

export default function AsmaulHusnaScreen() {
  const [search, setSearch] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const deferredSearch = useDeferredValue(search);

  // Bundled data: 99 names, filtered on device with no network.
  const names = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();
    return ASMAUL_HUSNA.filter(
      (item) =>
        !query ||
        item.latin.toLowerCase().includes(query) ||
        item.arti.toLowerCase().includes(query),
    ).sort((a, b) => (isAscending ? a.urutan - b.urutan : b.urutan - a.urutan));
  }, [deferredSearch, isAscending]);

  return (
    <View className="flex-1">
      <View className="flex-row gap-2 px-4 pb-3 pt-4">
        <Input
          className="flex-1"
          accessibilityLabel="Cari nama atau arti"
          placeholder="Cari nama atau arti"
          returnKeyType="search"
          autoCorrect={false}
          value={search}
          onChangeText={setSearch}
        />
        <Button
          variant="outline"
          accessibilityLabel={`Urutkan: ${isAscending ? "naik" : "turun"}`}
          onPress={() => setIsAscending((value) => !value)}
        >
          <Text>{isAscending ? "Naik" : "Turun"}</Text>
          <Icon as={isAscending ? ArrowUp : ArrowDown} />
        </Button>
      </View>

      <FlatList
        data={names}
        keyExtractor={(item) => String(item.urutan)}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="px-4 pb-10"
        ListHeaderComponent={names.length ? <View className="border-b border-border" /> : undefined}
        ListEmptyComponent={
          <EmptyState
            icon={SearchX}
            title="Asmaul Husna yang dicari tidak ditemukan."
            description="Coba kata kunci lain atau tampilkan semua nama."
            action={
              <Button variant="outline" onPress={() => setSearch("")}>
                <Text>Hapus pencarian</Text>
              </Button>
            }
          />
        }
        renderItem={({ item }) => (
          <AsmaulHusnaRow item={item} search={deferredSearch} />
        )}
      />
    </View>
  );
}
