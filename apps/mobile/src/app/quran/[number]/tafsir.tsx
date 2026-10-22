import {
  EmptyState,
  ErrorState,
  ListSkeleton,
} from "@/components/common/state-views";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { api } from "@/lib/api";
import { copyText } from "@/lib/share";
import { usePreferences } from "@/store/preferences";
import { queryKeys } from "@jadwal-sholat/core/api";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Copy, MessageSquareOff } from "lucide-react-native";
import { ScrollView, View } from "react-native";

export default function TafsirScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ number: string }>();
  const number = Number(params.number);
  const qori = usePreferences((state) => state.qori);

  // Same key as the surah screen, so this reads its cached response.
  const { data: surah, isPending, isError, refetch } = useQuery({
    queryKey: queryKeys.surah(number, qori),
    queryFn: ({ signal }) => api.surah(number, qori, signal),
  });

  const tafsir = surah?.tafsir.id;

  function renderBody() {
    if (isPending) return <ListSkeleton rows={6} rowClassName="h-5" label="Memuat tafsir…" />;
    if (isError || !surah) {
      return <ErrorState title="Tafsir belum dapat dimuat" onRetry={() => refetch()} />;
    }
    if (!tafsir) {
      return (
        <EmptyState
          icon={MessageSquareOff}
          title="Tafsir belum tersedia"
          description="Surat ini belum punya tafsir ringkas."
          action={
            <Button variant="outline" onPress={() => router.back()}>
              <Text>Kembali ke surat</Text>
            </Button>
          }
        />
      );
    }

    return (
      <View className="gap-6">
        <Text variant="muted">Tafsir ringkas dalam bahasa Indonesia.</Text>
        <Text selectable className="text-sm leading-relaxed">
          {tafsir}
        </Text>
        <Button
          variant="outline"
          className="self-start"
          onPress={() => void copyText(tafsir, "Tafsir disalin")}
        >
          <Icon as={Copy} size={16} />
          <Text>Salin tafsir</Text>
        </Button>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{ title: surah ? `Tafsir ${surah.asma.id.short}` : "Tafsir" }}
      />
      <ScrollView contentContainerClassName="p-4 pb-10">{renderBody()}</ScrollView>
    </>
  );
}
