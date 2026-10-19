"use client";

import { PageHeader } from "@/components/common/page-shell";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/reui/alert";
import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/reui/frame";
import { Jadwal } from "@/components/table-jadwal-sholat";
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
import { useFetch, useGeolocation } from "@/hooks";
import { JadwalSholatProps } from "@/interfaces";
import {
  formatCountdown,
  formatSholatTime,
  getNextPrayer,
} from "@/lib/helpers";
import { cn } from "@/lib/utils/cn";
import { bulan, currentDate, matchDate, tahun } from "@/lib/utils/constants";
import useGlobalStore from "@/store";
import { CalendarX2, CircleAlert, MapPin, RefreshCw } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const { NEXT_PUBLIC_JADWAL_SHOLAT_API } = env;

const Map = dynamic(() => import("@/components/map").then((mod) => mod.Map), {
  loading: () => <Skeleton className="h-75 w-full md:h-155" />,
  ssr: false,
});
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

function useNow(intervalMs = 30_000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

export function Homepage() {
  const { position, isOpenMap, setIsOpenMap } = useGlobalStore((state) => ({
    position: state.position,
    isOpenMap: state.isOpenMap,
    setIsOpenMap: state.setIsOpenMap,
  }));

  useGeolocation();
  const now = useNow();

  const { data, isPending, isError, isRefetching, refetch } = useFetch<{
    data: JadwalSholatProps[];
  }>(
    `${NEXT_PUBLIC_JADWAL_SHOLAT_API}/${tahun}/${bulan}?latitude=${position.lat}&longitude=${position.lng}&method=20`,
  );

  const waktu = data?.data ?? [];
  const todayIndex = waktu.findIndex(
    (item) => item.date.gregorian.date === matchDate,
  );
  const jadwalHariIni = waktu[todayIndex];
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
    if (isPending) return <ScheduleSkeleton />;

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
              {isRefetching ? (
                <Spinner aria-label="Memperbarui jadwal" />
              ) : null}
            </div>
            {locationButton}
          </FrameHeader>
          <FramePanel aria-live="polite">
            {nextPrayer ? (
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-muted-foreground">
                  {nextPrayer.isTomorrow ? "Berikutnya, besok" : "Berikutnya"}
                </p>
                <p className="flex flex-wrap items-baseline gap-x-2">
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
            <Jadwal waktu={waktu} />
          </FramePanel>
        </Frame>
      </div>
    );
  }

  return (
    <>
      {waktu.length > 0 ? <Adzan waktu={waktu} /> : null}
      <PageHeader title="Jadwal Sholat" description={currentDate} />
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
