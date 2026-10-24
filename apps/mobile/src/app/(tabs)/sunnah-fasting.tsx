import {
  EmptyState,
  ErrorState,
  ListSkeleton,
} from "@/components/common/state-views";
import { OptionSelect } from "@/components/puasa/option-select";
import { PuasaRow } from "@/components/puasa/puasa-row";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useNow } from "@/hooks/use-now";
import { api } from "@/lib/api";
import { queryKeys } from "@jadwal-sholat/core/api";
import {
  formatToIndonesianDate,
  getDateParts,
  INDONESIAN_MONTHS,
} from "@jadwal-sholat/core/dates";
import {
  filterPuasaDates,
  findNextFast,
  PUASA_TYPES,
  type PuasaTypeFilter,
} from "@jadwal-sholat/core/puasa";
import { useQuery } from "@tanstack/react-query";
import { CalendarX } from "lucide-react-native";
import { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

const MONTH_OPTIONS = INDONESIAN_MONTHS.map((month) => ({
  label: month.label,
  value: month.value,
}));
const TYPE_OPTIONS = PUASA_TYPES.map((type) => ({
  label: type.name,
  value: type.key,
}));

export default function PuasaSunnahScreen() {
  const now = useNow();
  const today = getDateParts(now);
  // null until the reader picks one, so the default follows the clock.
  const [pickedMonth, setPickedMonth] = useState<string | null>(null);
  const [type, setType] = useState<PuasaTypeFilter>("all");

  const month = `${today.tahun}-${pickedMonth ?? today.bulan}`;
  // Same key as the home shortcut, so the current month is fetched once.
  const { data, isPending, isError, isRefetching, refetch } = useQuery({
    queryKey: queryKeys.puasaSchedule(month),
    queryFn: ({ signal }) => api.puasaSchedule(month, signal),
  });

  const puasaList = data ? filterPuasaDates(data.dates, type) : [];
  const nextFast = findNextFast(puasaList, today.isoDate);

  function renderEmpty() {
    if (isPending) {
      return <ListSkeleton label="Memuat jadwal puasa sunnah…" rowClassName="h-20" />;
    }
    if (isError) {
      return (
        <ErrorState title="Jadwal belum dapat dimuat" onRetry={() => refetch()} />
      );
    }
    return (
      <EmptyState
        icon={CalendarX}
        title="Belum ada jadwal"
        description={
          type === "all"
            ? "Jadwal puasa sunnah bulan ini belum tersedia."
            : "Tidak ada jadwal untuk jenis puasa ini bulan ini."
        }
        action={
          type === "all" ? (
            <Button variant="outline" onPress={() => refetch()}>
              <Text>Muat ulang</Text>
            </Button>
          ) : (
            <Button variant="outline" onPress={() => setType("all")}>
              <Text>Tampilkan semua</Text>
            </Button>
          )
        }
      />
    );
  }

  return (
    <View className="flex-1">
      <View className="gap-3 px-4 pb-3 pt-4">
        <View className="flex-row gap-2">
          <OptionSelect
            label="Bulan"
            className="flex-1"
            options={MONTH_OPTIONS}
            value={pickedMonth ?? today.bulan}
            onValueChange={setPickedMonth}
          />
          <OptionSelect
            label="Jenis puasa"
            className="flex-[1.6]"
            options={TYPE_OPTIONS}
            value={type}
            onValueChange={(value) => setType(value as PuasaTypeFilter)}
          />
        </View>
        {nextFast ? (
          <Text className="text-sm">
            <Text variant="muted">Berikutnya </Text>
            <Text className="text-sm font-medium">
              {formatToIndonesianDate(nextFast.date) ?? nextFast.date.slice(0, 10)}
            </Text>
            <Text variant="muted">
              {" · "}
              {nextFast.recommendations
                .map((recommendation) => recommendation.name)
                .join(", ")}
            </Text>
          </Text>
        ) : null}
      </View>

      <FlatList
        data={puasaList}
        keyExtractor={(puasa) => puasa.date}
        contentContainerClassName="px-4 pb-10"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={() => void refetch()} />
        }
        ListHeaderComponent={
          puasaList.length ? <View className="border-b border-border" /> : undefined
        }
        ListEmptyComponent={renderEmpty()}
        renderItem={({ item }) => <PuasaRow puasa={item} todayIso={today.isoDate} />}
      />
    </View>
  );
}
