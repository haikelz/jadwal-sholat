import { EmptyState, ErrorState } from "@/components/common/state-views";
import { HomeShortcuts } from "@/components/home/home-shortcuts";
import { MonthSchedule } from "@/components/home/month-schedule";
import { TodayTimes } from "@/components/home/today-times";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { useDeviceLocation } from "@/hooks/use-device-location";
import { useNow } from "@/hooks/use-now";
import { usePrayerMonth } from "@/hooks/use-prayer-month";
import { useLocation } from "@/store/location";
import { usePreferences } from "@/store/preferences";
import { INDONESIAN_MONTHS } from "@jadwal-sholat/core/dates";
import {
  formatCountdown,
  formatSholatTime,
  getCurrentPrayer,
  getNextPrayer,
} from "@jadwal-sholat/core/prayer";
import { Link, useRouter } from "expo-router";
import { Bell, CalendarX2, MapPin } from "lucide-react-native";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";

function Dot() {
  return <View className="size-1 rounded-full bg-muted-foreground/40" />;
}

export default function HomeScreen() {
  const router = useRouter();
  const now = useNow();
  const isLocationReady = useDeviceLocation();
  const label = useLocation((state) => state.label);
  const adzanEnabled = usePreferences((state) => state.adzanEnabled);

  const {
    days,
    today,
    todayIndex,
    todayTimings,
    tomorrowTimings,
    isShowingStored,
    isError,
    isPending,
    isRefetching,
    refetch,
  } = usePrayerMonth(now, isLocationReady);

  const currentPrayer = todayTimings ? getCurrentPrayer(todayTimings, now) : null;
  const nextPrayer = todayTimings
    ? getNextPrayer(todayTimings, tomorrowTimings, now)
    : null;
  const hijri = days[todayIndex]?.date.hijri;
  const nowTime = formatSholatTime(
    `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
  );
  const monthTitle = `${INDONESIAN_MONTHS[now.getMonth()].label} ${now.getFullYear()}`;
  const isLoadingFirst = (isPending || !isLocationReady) && days.length === 0;

  function renderSchedule() {
    if (isLoadingFirst) {
      return (
        <View accessibilityLabel="Memuat jadwal sholat…" className="gap-3">
          <Skeleton className="h-36 w-full" />
          <Skeleton className="h-48 w-full" />
        </View>
      );
    }

    if (isError && days.length === 0) {
      return (
        <ErrorState title="Jadwal belum dapat dimuat" onRetry={() => refetch()} />
      );
    }

    if (days.length === 0) {
      return (
        <EmptyState
          icon={CalendarX2}
          title="Jadwal belum tersedia"
          description="Coba pilih lokasi lain."
          action={
            <Button onPress={() => router.push("/location")}>
              <Icon as={MapPin} />
              <Text>Pilih lokasi</Text>
            </Button>
          }
        />
      );
    }

    return (
      <View className="gap-8">
        {todayTimings ? (
          <TodayTimes
            timings={todayTimings}
            nextKey={nextPrayer && !nextPrayer.isTomorrow ? nextPrayer.key : undefined}
            nowTime={nowTime}
          />
        ) : null}
        <HomeShortcuts
          month={`${today.tahun}-${today.bulan}`}
          todayIso={today.isoDate}
        />
        <MonthSchedule days={days} todayIndex={todayIndex} title={monthTitle} />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerClassName="gap-8 px-4 pb-10 pt-4"
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={() => void refetch()} />
      }
    >
      <View className="gap-3">
        <View className="flex-row flex-wrap items-center gap-x-2 gap-y-1">
          <Text variant="muted">{today.currentDate}</Text>
          {hijri ? (
            <>
              <Dot />
              <Text variant="muted">
                {Number(hijri.day)} {hijri.month.en} {hijri.year} H
              </Text>
            </>
          ) : null}
          {isPending && isShowingStored ? (
            <ActivityIndicator accessibilityLabel="Memperbarui jadwal" size="small" />
          ) : null}
          {isError && isShowingStored ? (
            <Badge variant="secondary">
              <Text>Jadwal tersimpan</Text>
            </Badge>
          ) : null}
        </View>

        <Link href="/location" asChild>
          <Button
            variant="outline"
            className="self-start"
            accessibilityLabel={`Ubah lokasi, saat ini ${label ?? "belum dipilih"}`}
          >
            <Icon as={MapPin} />
            <Text>{label ? `${label} · Ubah` : "Pilih lokasi"}</Text>
          </Button>
        </Link>

        {nextPrayer ? (
          <View
            className="gap-2"
            accessible
            accessibilityLiveRegion="polite"
            accessibilityLabel={`Sholat berikutnya ${nextPrayer.name} pukul ${formatSholatTime(nextPrayer.time)}, ${formatCountdown(now, nextPrayer.at)}`}
          >
            <Text variant="muted">
              {currentPrayer ? `Sedang waktu ${currentPrayer.name} · b` : "B"}
              erikutnya{nextPrayer.isTomorrow ? ", besok" : ""}
            </Text>
            <View className="flex-row flex-wrap items-baseline gap-x-4">
              <Text
                accessibilityRole="header"
                className="text-5xl font-semibold leading-tight tracking-tight"
              >
                {nextPrayer.name}
              </Text>
              <Text className="text-5xl font-semibold leading-tight tracking-tight text-muted-foreground tabular-nums">
                {formatSholatTime(nextPrayer.time)}
              </Text>
            </View>
            <Text className="tabular-nums">{formatCountdown(now, nextPrayer.at)}</Text>
          </View>
        ) : (
          <View className="gap-2">
            <Text accessibilityRole="header" className="text-3xl font-semibold tracking-tight">
              Jadwal Sholat
            </Text>
            {isLoadingFirst ? (
              <Skeleton className="h-12 w-64" />
            ) : (
              <Text variant="muted">
                {todayTimings
                  ? "Sholat hari ini sudah selesai."
                  : "Jadwal hari ini belum tersedia."}
              </Text>
            )}
          </View>
        )}

        {adzanEnabled ? null : (
          <View className="gap-1.5">
            <Link href="/settings" asChild>
              <Button variant="outline" className="self-start">
                <Icon as={Bell} />
                <Text>Aktifkan adzan</Text>
              </Button>
            </Link>
            <Text variant="muted">
              Adzan berbunyi saat masuk waktu sholat, juga saat aplikasi ditutup.
            </Text>
          </View>
        )}
      </View>

      {renderSchedule()}
    </ScrollView>
  );
}
