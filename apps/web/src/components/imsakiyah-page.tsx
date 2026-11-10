import { LocationButton, LocationDialog } from "@/components/common/location-picker";
import { PageHeader } from "@/components/common/page-shell";
import type { CityView } from "@/components/homepage";
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
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetch, useGeolocation, useIsMounted, useNow } from "@/hooks";
import type { JadwalSholatProps } from "@/interfaces";
import { getDateParts } from "@/lib/utils/date-parts";
import { env } from "@/lib/utils/public-env";
import useGlobalStore from "@/store";
import { prayerMonthUrl } from "@jadwal-sholat/core/api";
import {
  kemenagRamadan,
  ramadanHijriYear,
  shiftIsoDate,
  umalquraRamadan,
  zonedNow,
} from "@jadwal-sholat/core/dates";
import { format, parseISO } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { CircleAlert, RefreshCw } from "lucide-react";
import { lazy, Suspense, useMemo } from "react";

// The month grid pulls in TanStack Table; it loads on the client after mount.
const Jadwal = lazy(() =>
  import("@/components/table-jadwal-sholat").then((mod) => ({ default: mod.Jadwal })),
);

const { JADWAL_SHOLAT_API } = env;

/** One date on Kemenag's Hijri calendar, through the /api/fasting-day proxy. */
type FastingDay = {
  data: { calendar: string; hijri: { year: number; month: number; day: number } };
};

function GridSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-4" role="status">
      <span className="sr-only">Memuat jadwal imsakiyah…</span>
      {Array.from({ length: 6 }, (_, index) => (
        <Skeleton key={index} className="h-8 w-full" />
      ))}
    </div>
  );
}

/** "08-02-2027" (aladhan's format) as "2027-02-08". */
const isoFromApi = (date: string) => `${date.slice(6)}-${date.slice(3, 5)}-${date.slice(0, 2)}`;
const longDate = (iso: string) => format(parseISO(iso), "d MMMM yyyy", { locale: localeId });

/**
 * Ramadan's prayer times, with Imsak and Maghrib for starting and breaking the
 * fast. The dates follow Kemenag's Hijri calendar (Umm al-Qura when it can't
 * be read); without `city` the times follow the reader's location.
 */
export function ImsakiyahPage({ city }: { city?: CityView }) {
  const readerPosition = useGlobalStore((state) => state.position);
  const position = city?.position ?? readerPosition;
  const isMounted = useIsMounted();
  const isLocationReady = useGeolocation(!city);
  const deviceNow = useNow();
  const now = deviceNow && city ? zonedNow(deviceNow, city.timeZone) : deviceNow;

  // Kemenag's dates: look up the estimated 15 Ramadan to find the first day,
  // then day 30 to learn whether the month has 29 or 30 days.
  // The estimate scans the calendar, so it runs once a day, not every tick.
  const today = now ? format(now, "yyyy-MM-dd") : null;
  const estimate = useMemo(() => (today ? umalquraRamadan(parseISO(today)) : null), [today]);
  const inside = estimate ? shiftIsoDate(estimate.start, 14) : null;
  const insideDay = useFetch<FastingDay>(inside ? `/api/fasting-day/${inside}` : "");
  const insideHijri =
    insideDay.data?.data.calendar === "id" && insideDay.data.data.hijri.month === 9
      ? insideDay.data.data.hijri
      : null;
  const day30 = inside && insideHijri ? shiftIsoDate(inside, 30 - insideHijri.day) : null;
  const lastDay = useFetch<FastingDay>(day30 ? `/api/fasting-day/${day30}` : "");
  const kemenag =
    inside && insideHijri && lastDay.data
      ? kemenagRamadan(inside, insideHijri.day, lastDay.data.data.hijri.month)
      : null;
  // Outside Kemenag's published calendar, or with the API down: Umm al-Qura.
  const isUmmAlQura =
    !kemenag && (insideDay.isError || lastDay.isError || (!!insideDay.data && !insideHijri));
  const ramadan = kemenag ?? (isUmmAlQura ? estimate : null);
  const hijriYear = insideHijri?.year ?? (now ? ramadanHijriYear(now) : null);

  // Prayer times on Kemenag's method, from the one or two months Ramadan spans.
  const monthUrl = (iso: string | undefined) =>
    iso && isLocationReady
      ? prayerMonthUrl(JADWAL_SHOLAT_API, { month: iso.slice(5, 7), position, year: iso.slice(0, 4) })
      : "";
  const spansTwoMonths = ramadan ? ramadan.start.slice(0, 7) !== ramadan.end.slice(0, 7) : false;
  const firstMonth = useFetch<{ data: JadwalSholatProps[] }>(monthUrl(ramadan?.start));
  const secondMonth = useFetch<{ data: JadwalSholatProps[] }>(
    spansTwoMonths ? monthUrl(ramadan?.end) : "",
  );
  const days = ramadan
    ? [...(firstMonth.data?.data ?? []), ...(secondMonth.data?.data ?? [])].filter((day) => {
        const iso = isoFromApi(day.date.gregorian.date);
        return iso >= ramadan.start && iso <= ramadan.end;
      })
    : [];
  const isPending = !ramadan || firstMonth.isPending || (spansTwoMonths && secondMonth.isPending);
  const isError = firstMonth.isError || secondMonth.isError;
  const retry = () => {
    void firstMonth.refetch();
    if (spansTwoMonths) void secondMonth.refetch();
  };
  const title = hijriYear ? `Ramadan ${hijriYear} H` : "Ramadan";

  return (
    <>
      <PageHeader
        title={city ? `Jadwal imsakiyah ${city.name}` : "Jadwal imsakiyah"}
        description={
          ramadan ? `${title}, ${longDate(ramadan.start)} sampai ${longDate(ramadan.end)}` : title
        }
      />
      {city ? null : (
        <div className="flex flex-wrap items-center gap-2">
          <LocationButton />
          <LocationDialog />
        </div>
      )}
      <Frame>
        <FrameHeader className="flex-row items-baseline justify-between gap-2">
          <FrameTitle>
            <h2>{title}</h2>
          </FrameTitle>
          <FrameDescription>Imsak tanda mulai puasa, Maghrib waktu berbuka</FrameDescription>
        </FrameHeader>
        <FramePanel className="p-0" aria-busy={firstMonth.isRefetching}>
          {isError ? (
            <Alert variant="destructive" className="m-4 w-auto">
              <CircleAlert aria-hidden="true" />
              <AlertTitle>Jadwal imsakiyah gagal dimuat</AlertTitle>
              <AlertDescription>Periksa koneksi internet, lalu coba lagi.</AlertDescription>
              <AlertAction>
                <Button type="button" variant="outline" onClick={retry}>
                  <RefreshCw aria-hidden="true" data-icon="inline-start" />
                  Coba lagi
                </Button>
              </AlertAction>
            </Alert>
          ) : days.length && isMounted ? (
            <Suspense fallback={<GridSkeleton />}>
              <Jadwal waktu={days} today={now ? getDateParts(now).matchDate : undefined} range="full" />
            </Suspense>
          ) : isPending || !isMounted ? (
            <GridSkeleton />
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>Jadwal Ramadan belum tersedia</EmptyTitle>
                <EmptyDescription>Coba muat ulang beberapa saat lagi.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button type="button" variant="outline" onClick={retry}>
                  <RefreshCw aria-hidden="true" data-icon="inline-start" />
                  Muat ulang
                </Button>
              </EmptyContent>
            </Empty>
          )}
        </FramePanel>
      </Frame>
      <p className="text-sm text-muted-foreground">
        {isUmmAlQura
          ? "Kalender Kemenag belum tersedia untuk Ramadan ini, jadi tanggalnya mengikuti kalender Umm al-Qura dan bisa berbeda satu hari dari ketetapan Kemenag. "
          : "Tanggal mengikuti Kalender Hijriah Indonesia terbitan Kemenag RI. "}
        Sidang isbat bisa menggeser awal atau akhir Ramadan satu hari. Waktu sholat dihitung
        dengan metode Kemenag RI.
      </p>
    </>
  );
}
