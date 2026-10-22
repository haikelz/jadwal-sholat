import { ErrorState } from "@/components/common/state-views";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { api } from "@/lib/api";
import { locateDevice } from "@/lib/locate-device";
import { useLocation } from "@/store/location";
import { formatPlaceLabel } from "@jadwal-sholat/core/api";
import { roundCoordinates } from "@jadwal-sholat/core/prayer";
import type { NominatimPlace } from "@jadwal-sholat/core/schemas";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { LocateFixed, MapPin, Search } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Pressable, View } from "react-native";

export default function LocationScreen() {
  const router = useRouter();
  const setLocation = useLocation((state) => state.setLocation);
  const [query, setQuery] = useState("");
  const [gpsFailed, setGpsFailed] = useState(false);

  const gps = useMutation({
    mutationFn: locateDevice,
    onSuccess: (result) => {
      if (!result) {
        setGpsFailed(true);
        return;
      }
      setLocation({ ...result, source: "gps" });
      router.back();
    },
  });

  // Nominatim's policy forbids search-as-you-type, so this runs on submit.
  const search = useMutation({
    mutationFn: (text: string) => api.placeSearch(text),
  });

  function submit() {
    const text = query.trim();
    if (text.length >= 2) search.mutate(text);
  }

  function pick(place: NominatimPlace) {
    setLocation({
      label: formatPlaceLabel(place.address),
      position: roundCoordinates({ lat: place.lat, lng: place.lon }),
      source: "manual",
    });
    router.back();
  }

  return (
    <FlatList
      data={search.data ?? []}
      keyExtractor={(place) => String(place.place_id)}
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="gap-1 p-4 pb-10"
      ListHeaderComponent={
        <View className="gap-6 pb-3">
          <View className="gap-2">
            <Button
              variant="outline"
              disabled={gps.isPending}
              onPress={() => {
                setGpsFailed(false);
                gps.mutate();
              }}
            >
              <Icon as={LocateFixed} />
              <Text>{gps.isPending ? "Mencari lokasi…" : "Gunakan lokasi saat ini"}</Text>
            </Button>
            {gpsFailed ? (
              <Text variant="muted">
                Lokasi tidak tersedia. Izinkan akses lokasi di pengaturan, atau
                cari kota di bawah.
              </Text>
            ) : null}
          </View>

          <Separator />

          <View className="gap-2">
            <Text className="font-medium">Cari kota</Text>
            <View className="flex-row gap-2">
              <Input
                className="flex-1"
                accessibilityLabel="Nama kota atau kabupaten"
                placeholder="Contoh: Kota Bandung"
                autoCapitalize="words"
                returnKeyType="search"
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={submit}
              />
              <Button
                size="icon"
                accessibilityLabel="Cari"
                disabled={search.isPending}
                onPress={submit}
              >
                <Icon as={Search} />
              </Button>
            </View>
          </View>

          {search.isError ? (
            <ErrorState title="Pencarian gagal" onRetry={submit} />
          ) : null}
          {search.data?.length === 0 ? (
            <Text variant="muted">Kota tidak ditemukan. Coba nama lain.</Text>
          ) : null}
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          accessibilityRole="button"
          onPress={() => pick(item)}
          className="flex-row items-center gap-3 rounded-md px-2 py-3 active:bg-muted"
        >
          <Icon as={MapPin} size={16} className="text-muted-foreground" />
          <View className="min-w-0 flex-1">
            <Text className="font-medium">{formatPlaceLabel(item.address)}</Text>
            <Text variant="muted" numberOfLines={2}>
              {item.display_name}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
}
