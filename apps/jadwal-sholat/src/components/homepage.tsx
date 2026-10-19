"use client";

import { PageHeader } from "@/components/common/page-shell";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/reui/alert";
import { Badge } from "@/components/reui/badge";
import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/reui/frame";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { env } from "@/lib/utils/public-env";
import { useFetch, useGeolocation, useNow } from "@/hooks";
import { useStoredCopy } from "@/hooks/use-stored-copy";
import { JadwalSholatProps } from "@/interfaces";
import {
  formatCountdown,
  formatSholatTime,
  getNextPrayer,
} from "@/lib/helpers";
import { getCurrentPrayer } from "@/lib/helpers/next-prayer";
import { cn } from "@/lib/utils/cn";
import { getDateParts } from "@/lib/utils/date-parts";
import useGlobalStore from "@/store";
import { Bell, CalendarX2, CircleAlert, MapPin, RefreshCw } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const { NEXT_PUBLIC_JADWAL_SHOLAT_API } = env;

const Map = dynamic(() => import("@/components/map").then((mod) => mod.Map), {
  loading: () => <Skeleton className="h-75 w-full md:h-155" />,
  ssr: false,
});
// The month grid sits below the fold and pulls in TanStack Table (~46KB gzip),
// so it loads after the today panel.
const Jadwal = dynamic(
  () => import("@/components/table-jadwal-sholat").then((mod) => mod.Jadwal),
  {
    loading: () => (
      <div className="flex flex-col gap-2 p-4" role="status">
        <span className="sr-only">Memuat jadwal bulan ini…</span>
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-8 w-full" />
        ))}
      </div>
    ),
  },
);
const UserLocation = dynamic(
  () => import("@/components/user-location").then((mod) => mod.UserLocation),
  { ssr: false },
);
const Adzan = dynamic(
  () => import("@/components/adzan").then((mod) => mod.Adzan),
  { ssr: false },
);

const prayerTimes = [
  { key: "Imsak", name: "Imsak" },
  { key: "Fajr", name: "Subuh" },
  { key: "Sunrise", name: "Terbit" },
  { key: "Dhuhr", name: "Dzuhur" },
  { key: "Asr", name: "Ashar" },
  { key: "Sunset", name: "Terbenam" },
  { key: "Maghrib", name: "Maghrib" },
  { key: "Isha", name: "Isya" },
] as const;

/** Asks for notification permission so the adzan prompt can reach a hidden tab. */
function ReminderButton() {
  const [permission, setPermission] = useState<NotificationPermission | null>(
    null,
  );

  useEffect(() => {
    if ("Notification" in window) setPermission(Notification.permission);
  }, []);

  // Hidden once the reader has answered, or where notifications don't exist.
  if (permission !== "default") return null;

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={async () => setPermission(await Notification.requestPermission())}
    >
      <Bell aria-hidden="true" />
      Aktifkan pengingat
    </Button>
  );
}

function ScheduleSkeleton() {
  return (
    <Frame stacked role="status" aria-live="polite">
      <span className="sr-only">Memuat jadwal sholat…</span>
      <FrameHeader className="flex-row items-center justify-between gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-7 w-28" />
      </FrameHeader>
      <FramePanel className="flex flex-col gap-1.5">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-28" />
      </FramePanel>
      <FramePanel>
        <div className="grid grid-cols-4 gap-x-3 gap-y-4 lg:grid-cols-8">
          {prayerTimes.map((prayer) => (
            <div key={prayer.key} className="flex flex-col gap-1.5">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </FramePanel>
    </Frame>
  );
}

export function Homepage() {
  const { position, isOpenMap, setIsOpenMap } = useGlobalStore((state) => ({
    position: state.position,
    isOpenMap: state.isOpenMap,
    setIsOpenMap: state.setIsOpenMap,
  }));

  const isLocationReady = useGeolocation();
  const now = useNow();
  const today = now ? getDateParts(now) : null;

  const {
    data,
    isPending,
    isError,
    isRefetching,
    isPlaceholderData,
    refetch,
  } = useFetch<{
    data: JadwalSholatProps[];
  }>(
    // Wait for the clock and the location so the month is fetched once.
    today && isLocationReady
      ? `${NEXT_PUBLIC_JADWAL_SHOLAT_API}/${today.tahun}/${today.bulan}?latitude=${position.lat}&longitude=${position.lng}&method=20`
      : "",
  );

  // The last schedule fetched for this month: shown while the network loads,
  // and instead of the error when the reader is offline.
  const stored = useStoredCopy(
    "jadwal-sholat:schedule",
    today ? `${today.tahun}-${today.bulan}` : "",
    // keepPreviousData briefly shows the old month; never store that.
    isPlaceholderData ? undefined : data,
  );
  const isShowingStored = !data && stored !== undefined;
  const waktu = data?.data ?? stored?.data ?? [];
  const todayIndex = waktu.findIndex(
    (item) => item.date.gregorian.date === today?.matchDate,
  );
  const jadwalHariIni = waktu[todayIndex];
  const currentPrayer =
    jadwalHariIni && now ? getCurrentPrayer(jadwalHariIni.timings, now) : null;
  const nextPrayer =
    jadwalHariIni && now
      ? getNextPrayer(
          jadwalHariIni.timings,
          waktu[todayIndex + 1]?.timings,
          now,
        )
      : null;

  const locationButton = (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => setIsOpenMap(true)}
    >
      <MapPin aria-hidden="true" />
      <span className="sr-only">Ubah lokasi, saat ini </span>
      <UserLocation />
    </Button>
  );

  function renderSchedule() {
    if (isPending && waktu.length === 0) return <ScheduleSkeleton />;

    if (isError && waktu.length === 0) {
      return (
        <Alert variant="destructive">
          <CircleAlert aria-hidden="true" />
          <AlertTitle>Jadwal belum dapat dimuat</AlertTitle>
          <AlertDescription>Periksa koneksi, lalu coba lagi.</AlertDescription>
          <AlertAction>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => refetch()}
            >
              <RefreshCw aria-hidden="true" />
              Coba lagi
            </Button>
          </AlertAction>
        </Alert>
      );
    }

    if (waktu.length === 0) {
      return (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CalendarX2 aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>Jadwal belum tersedia</EmptyTitle>
            <EmptyDescription>Coba pilih lokasi lain.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button type="button" onClick={() => setIsOpenMap(true)}>
              <MapPin aria-hidden="true" />
              Pilih lokasi
            </Button>
          </EmptyContent>
        </Empty>
      );
    }

    return (
      <div className="flex min-w-0 flex-col gap-6">
        <Frame stacked>
          <FrameHeader className="flex-row items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <FrameTitle>
                <h2>Hari ini</h2>
              </FrameTitle>
              {isRefetching || (isPending && isShowingStored) ? (
                <Spinner aria-label="Memperbarui jadwal" />
              ) : null}
              {isError && isShowingStored ? (
                <Badge variant="warning-light">Jadwal tersimpan</Badge>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <ReminderButton />
              {locationButton}
            </div>
          </FrameHeader>
          <FramePanel>
            {/* Announces only when the next prayer changes, not every
                countdown tick. */}
            <p className="sr-only" aria-live="polite">
              {nextPrayer
                ? `Sholat berikutnya ${nextPrayer.name} pukul ${formatSholatTime(nextPrayer.time)}`
                : ""}
            </p>
            {nextPrayer ? (
              <div className="flex flex-col gap-0.5">
                {currentPrayer ? (
                  <p className="text-sm font-medium">
                    Sedang waktu {currentPrayer.name}
                  </p>
                ) : null}
                <p className="text-xs text-muted-foreground">
                  {nextPrayer.isTomorrow ? "Berikutnya, besok" : "Berikutnya"}
                </p>
                <p
                  aria-hidden="true"
                  className="flex flex-wrap items-baseline gap-x-2"
                >
                  <span className="text-2xl font-semibold tracking-tight">
                    {nextPrayer.name}
                  </span>
                  <span className="text-2xl font-semibold tracking-tight tabular-nums">
                    {formatSholatTime(nextPrayer.time)}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground tabular-nums">
                  {now ? formatCountdown(now, nextPrayer.at) : null}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {!jadwalHariIni
                  ? "Jadwal hari ini belum tersedia."
                  : now
                    ? "Sholat hari ini sudah selesai."
                    : "Menghitung waktu sholat berikutnya…"}
              </p>
            )}
          </FramePanel>
          {jadwalHariIni ? (
            <FramePanel aria-busy={isRefetching}>
              <dl className="grid grid-cols-4 gap-x-3 gap-y-4 lg:grid-cols-8">
                {prayerTimes.map((prayer) => {
                  const isNext =
                    !nextPrayer?.isTomorrow && nextPrayer?.key === prayer.key;
                  return (
                    <div
                      key={prayer.key}
                      aria-current={isNext ? "time" : undefined}
                      className="flex min-w-0 flex-col gap-0.5"
                    >
                      <dt
                        className={cn(
                          "truncate text-xs",
                          isNext ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {prayer.name}
                      </dt>
                      <dd
                        className={cn(
                          "text-sm tabular-nums",
                          isNext
                            ? "font-semibold text-foreground"
                            : "font-medium text-muted-foreground",
                        )}
                      >
                        {formatSholatTime(jadwalHariIni.timings[prayer.key])}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </FramePanel>
          ) : null}
        </Frame>
        <Frame>
          <FrameHeader>
            <FrameTitle>
              <h2>Bulan ini</h2>
            </FrameTitle>
            <FrameDescription>Hari ini ditandai.</FrameDescription>
          </FrameHeader>
          <FramePanel className="p-0" aria-busy={isRefetching}>
            <Jadwal waktu={waktu} today={today?.matchDate} />
          </FramePanel>
        </Frame>
      </div>
    );
  }

  return (
    <>
      {waktu.length > 0 ? <Adzan waktu={waktu} /> : null}
      <PageHeader
        title="Jadwal Sholat"
        description={
          today ? (
            <span className="flex flex-wrap items-center gap-x-2">
              <span>{today.currentDate}</span>
              {jadwalHariIni ? (
                <>
                  <span
                    aria-hidden
                    className="size-1 shrink-0 rounded-full bg-muted-foreground/40"
                  />
                  <span>
                    {Number(jadwalHariIni.date.hijri.day)}{" "}
                    {jadwalHariIni.date.hijri.month.en}{" "}
                    {jadwalHariIni.date.hijri.year} H
                  </span>
                </>
              ) : null}
            </span>
          ) : (
            "\u00a0"
          )
        }
      />
      <section aria-label="Jadwal sholat" className="flex min-w-0 flex-col">
        {renderSchedule()}
      </section>
      <Dialog open={isOpenMap} onOpenChange={setIsOpenMap}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Pilih lokasi</DialogTitle>
            <DialogDescription>
              Cari atau ketuk peta untuk memilih lokasi.
            </DialogDescription>
          </DialogHeader>
          <Map />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Tutup
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
