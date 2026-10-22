"use client";

import { HomeShortcuts } from "@/components/home/home-shortcuts";
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
  FrameFooter,
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
import { JadwalSholatProps, TimingsProps } from "@/interfaces";
import {
  formatCountdown,
  formatSholatTime,
  getNextPrayer,
} from "@/lib/helpers";
import { getCurrentPrayer, PrayerKey } from "@/lib/helpers/next-prayer";
import { cn } from "@/lib/utils/cn";
import { getDateParts } from "@/lib/utils/date-parts";
import useGlobalStore from "@/store";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import {
  Bell,
  CalendarX2,
  Check,
  CircleAlert,
  MapPin,
  RefreshCw,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useId, useState } from "react";

const { NEXT_PUBLIC_JADWAL_SHOLAT_API } = env;

const Map = dynamic(() => import("@/components/map").then((mod) => mod.Map), {
  loading: () => <Skeleton className="h-75 w-full md:h-155" />,
  ssr: false,
});
// The month grid sits below the fold and pulls in TanStack Table (~46KB gzip),
// so it loads after today's times.
const Jadwal = dynamic(
  () => import("@/components/table-jadwal-sholat").then((mod) => mod.Jadwal),
  {
    loading: () => (
      <div className="flex flex-col gap-2 p-4" role="status">
        <span className="sr-only">Memuat jadwal bulan ini…</span>
        {Array.from({ length: 5 }, (_, index) => (
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

// Grid placement. Mobile stacks hero → times → shortcuts → month by `order`;
// from md the hero and shortcuts share the first row.
const HERO = "order-1 md:col-start-1 md:row-start-1";
const SHORTCUTS = "order-3 md:col-start-2 md:row-start-1 md:self-end";
const STRIP = "order-2 md:col-span-2 md:row-start-2";
const MONTH = "order-4 md:col-span-2 md:row-start-3";

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

  // Say what the reminder does before the browser asks for permission.
  return (
    <div className="flex flex-col items-start gap-1.5">
      <Button
        type="button"
        variant="outline"
        onClick={async () =>
          setPermission(await Notification.requestPermission())
        }
      >
        <Bell aria-hidden="true" />
        Aktifkan pengingat adzan
      </Button>
      <p className="text-sm text-muted-foreground">
        Pengingat muncul saat masuk waktu sholat. Browser akan meminta izin
        notifikasi.
      </p>
    </div>
  );
}

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="size-1 shrink-0 rounded-full bg-muted-foreground/40"
    />
  );
}

/** Today's eight times as a plain strip; the next prayer is highlighted. */
function TodayTimes({
  timings,
  nextKey,
  nowTime,
  className,
}: {
  timings: TimingsProps;
  nextKey?: PrayerKey;
  /** The current time as `HH.mm`, to mute times that have passed. */
  nowTime?: string;
  className?: string;
}) {
  return (
    <section
      aria-label="Waktu sholat hari ini"
      className={cn("border-y", className)}
    >
      <dl className="grid grid-cols-2 gap-y-1 py-2 sm:grid-cols-4 md:grid-cols-8 md:py-0">
        {prayerTimes.map((prayer) => {
          const time = formatSholatTime(timings[prayer.key]);
          const isNext = prayer.key === nextKey;
          const hasPassed = !isNext && nowTime !== undefined && time <= nowTime;
          return (
            <div
              key={prayer.key}
              aria-current={isNext ? "time" : undefined}
              className={cn(
                "flex min-w-0 flex-col gap-0.5 px-3 py-3 md:py-4",
                isNext && "bg-muted",
              )}
            >
              <dt
                className={cn(
                  "flex items-center gap-1 truncate text-sm",
                  isNext
                    ? "font-medium text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {hasPassed ? (
                  <Check aria-hidden="true" className="size-3.5 shrink-0" />
                ) : null}
                {prayer.name}
                {hasPassed ? (
                  <span className="sr-only">, sudah lewat</span>
                ) : null}
              </dt>
              <dd
                className={cn(
                  "text-lg tabular-nums",
                  isNext ? "font-semibold" : "font-medium",
                  hasPassed && "text-muted-foreground",
                )}
              >
                {time}
              </dd>
              {/* State in words, not only the muted background. */}
              {isNext ? (
                <dd>
                  <Badge variant="primary-light">Berikutnya</Badge>
                </dd>
              ) : null}
            </div>
          );
        })}
      </dl>
    </section>
  );
}

function ScheduleSkeleton() {
  return (
    <>
      <div
        role="status"
        aria-live="polite"
        className={cn(
          STRIP,
          "grid grid-cols-2 gap-y-1 border-y sm:grid-cols-4 md:grid-cols-8",
        )}
      >
        <span className="sr-only">Memuat jadwal sholat…</span>
        {prayerTimes.map((prayer) => (
          <div key={prayer.key} className="flex flex-col gap-1.5 px-3 py-4">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-6 w-14" />
          </div>
        ))}
      </div>
      <Frame className={MONTH}>
        <FrameHeader>
          <Skeleton className="h-4 w-32" />
        </FrameHeader>
        <FramePanel className="flex flex-col gap-2">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="h-8 w-full" />
          ))}
        </FramePanel>
      </Frame>
    </>
  );
}

export function Homepage() {
  const { position, isOpenMap, setIsOpenMap } = useGlobalStore((state) => ({
    position: state.position,
    isOpenMap: state.isOpenMap,
    setIsOpenMap: state.setIsOpenMap,
  }));
  const [showFullMonth, setShowFullMonth] = useState(false);
  const monthPanelId = useId();

  const isLocationReady = useGeolocation();
  const now = useNow();
  const today = now ? getDateParts(now) : null;

  const { data, isPending, isError, isRefetching, isPlaceholderData, refetch } =
    useFetch<{
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

  const hijri = jadwalHariIni?.date.hijri;
  const nextLabel = `${currentPrayer ? `Sedang waktu ${currentPrayer.name} · b` : "B"}erikutnya${nextPrayer?.isTomorrow ? ", besok" : ""}`;
  const isLoadingFirst = isPending && waktu.length === 0;

  function renderSchedule() {
    if (isLoadingFirst) return <ScheduleSkeleton />;

    if (isError && waktu.length === 0) {
      return (
        <div className={STRIP}>
          <Alert variant="destructive">
            <CircleAlert aria-hidden="true" />
            <AlertTitle>Jadwal belum dapat dimuat</AlertTitle>
            <AlertDescription>
              Periksa koneksi, lalu coba lagi.
            </AlertDescription>
            <AlertAction>
              <Button
                type="button"
                variant="outline"
                onClick={() => refetch()}
              >
                <RefreshCw aria-hidden="true" />
                Coba lagi
              </Button>
            </AlertAction>
          </Alert>
        </div>
      );
    }

    if (waktu.length === 0) {
      return (
        <div className={STRIP}>
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
        </div>
      );
    }

    return (
      <>
        {jadwalHariIni ? (
          <TodayTimes
            className={STRIP}
            timings={jadwalHariIni.timings}
            nextKey={
              nextPrayer && !nextPrayer.isTomorrow ? nextPrayer.key : undefined
            }
            nowTime={now ? format(now, "HH.mm") : undefined}
          />
        ) : null}
        <Frame className={MONTH}>
          <FrameHeader className="flex-row items-baseline justify-between gap-2">
            <FrameTitle>
              <h2>
                {now
                  ? format(now, "MMMM yyyy", { locale: localeId })
                  : "Bulan ini"}
              </h2>
            </FrameTitle>
            <FrameDescription>Hari ini ditandai</FrameDescription>
          </FrameHeader>
          <FramePanel
            id={monthPanelId}
            className="p-0"
            aria-busy={isRefetching}
          >
            <Jadwal
              waktu={waktu}
              today={today?.matchDate}
              range={showFullMonth ? "full" : "around-today"}
            />
          </FramePanel>
          <FrameFooter className="flex-row">
            <Button
              type="button"
              variant="outline"
              aria-expanded={showFullMonth}
              aria-controls={monthPanelId}
              onClick={() => setShowFullMonth((value) => !value)}
            >
              {showFullMonth
                ? "Tampilkan sekitar hari ini"
                : "Lihat sebulan penuh"}
            </Button>
          </FrameFooter>
        </Frame>
      </>
    );
  }

  return (
    <>
      {waktu.length > 0 ? <Adzan waktu={waktu} /> : null}
      <div className="grid min-w-0 grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:gap-x-16 md:gap-y-10">
        <section
          aria-labelledby="hero-title"
          className={cn(HERO, "flex min-w-0 flex-col gap-3")}
        >
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            {today ? (
              <span>{today.currentDate}</span>
            ) : (
              <Skeleton className="h-4 w-32" />
            )}
            {hijri ? (
              <>
                <Dot />
                <span>
                  {Number(hijri.day)} {hijri.month.en} {hijri.year} H
                </span>
              </>
            ) : null}
            <Dot />
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpenMap(true)}
            >
              <MapPin aria-hidden="true" />
              <span className="sr-only">Lokasi saat ini </span>
              <UserLocation />
              <span aria-hidden="true">·</span>
              Ubah
            </Button>
            {isRefetching || (isPending && isShowingStored) ? (
              <Spinner aria-label="Memperbarui jadwal" />
            ) : null}
            {isError && isShowingStored ? (
              <Badge variant="warning-light">Jadwal tersimpan</Badge>
            ) : null}
          </div>

          {/* Announces only when the next prayer changes, not every
              countdown tick. */}
          <p className="sr-only" aria-live="polite">
            {nextPrayer
              ? `Sholat berikutnya ${nextPrayer.name} pukul ${formatSholatTime(nextPrayer.time)}`
              : ""}
          </p>

          {nextPrayer ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">{nextLabel}</p>
              <h1
                id="hero-title"
                className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-5xl leading-none font-semibold tracking-tight md:text-7xl"
              >
                <span className="sr-only">Jadwal sholat, berikutnya </span>
                <span>{nextPrayer.name}</span>
                <span className="text-muted-foreground tabular-nums">
                  {formatSholatTime(nextPrayer.time)}
                </span>
              </h1>
              <p className="text-base tabular-nums">
                {now ? formatCountdown(now, nextPrayer.at) : null}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <h1
                id="hero-title"
                className="text-3xl font-semibold tracking-tight md:text-4xl"
              >
                Jadwal Sholat
              </h1>
              {isLoadingFirst ? (
                <Skeleton className="h-12 w-64 max-w-full" />
              ) : (
                <p className="text-sm text-muted-foreground">
                  {!jadwalHariIni
                    ? "Jadwal hari ini belum tersedia."
                    : now
                      ? "Sholat hari ini sudah selesai."
                      : "Menghitung waktu sholat berikutnya…"}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            <ReminderButton />
          </div>
        </section>

        <HomeShortcuts
          className={SHORTCUTS}
          month={today ? `${today.tahun}-${today.bulan}` : undefined}
          todayIso={now ? format(now, "yyyy-MM-dd") : undefined}
        />

        {renderSchedule()}
      </div>

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
