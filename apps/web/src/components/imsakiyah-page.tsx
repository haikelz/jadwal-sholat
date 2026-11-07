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
import { ramadanUrl } from "@jadwal-sholat/core/api";
import { ramadanHijriYear, zonedNow } from "@jadwal-sholat/core/dates";
import { format, parse } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { CircleAlert, RefreshCw } from "lucide-react";
import { lazy, Suspense } from "react";

// The month grid pulls in TanStack Table; it loads on the client after mount.
const Jadwal = lazy(() =>
  import("@/components/table-jadwal-sholat").then((mod) => ({ default: mod.Jadwal })),
);
const UserLocation = lazy(() =>
  import("@/components/user-location").then((mod) => ({ default: mod.UserLocation })),
);

const { JADWAL_SHOLAT_API } = env;

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

/** "08-02-2027" (the API's format) as "8 Februari 2027". */
function longDate(ddMMyyyy: string) {
  return format(parse(ddMMyyyy, "dd-MM-yyyy", new Date()), "d MMMM yyyy", { locale: localeId });
}

/**
 * Ramadan's prayer times, with Imsak and Maghrib for starting and breaking the
 * fast. Without `city` it follows the reader's location; with `city` it shows
 * that city on its own clock.
 */
export function ImsakiyahPage({ city }: { city?: CityView }) {
  const readerPosition = useGlobalStore((state) => state.position);
  const position = city?.position ?? readerPosition;
  const isMounted = useIsMounted();
  const isLocationReady = useGeolocation(!city);
  const deviceNow = useNow();
  const now = deviceNow && city ? zonedNow(deviceNow, city.timeZone) : deviceNow;
  // The year comes from the reader's clock, never the build's.
  const hijriYear = now ? ramadanHijriYear(now) : null;

  const { data, isPending, isError, isRefetching, refetch } = useFetch<{
    data: JadwalSholatProps[];
  }>(hijriYear && isLocationReady ? ramadanUrl(JADWAL_SHOLAT_API, { hijriYear, position }) : "");
  const days = data?.data ?? [];
  const first = days[0]?.date.gregorian.date;
  const last = days.at(-1)?.date.gregorian.date;
  const ramadan = hijriYear ? `Ramadan ${hijriYear} H` : "Ramadan";

  return (
    <>
      <PageHeader
        title={city ? `Jadwal imsakiyah ${city.name}` : "Jadwal imsakiyah"}
        description={first && last ? `${ramadan}, ${longDate(first)} sampai ${longDate(last)}` : ramadan}
      />
      {city ? null : (
        <p className="text-sm text-muted-foreground">
          Lokasi:{" "}
          {isMounted ? (
            <Suspense fallback={<span>lokasi terpilih</span>}>
              <UserLocation />
            </Suspense>
          ) : (
            <span>lokasi terpilih</span>
          )}
          . Ubah lokasi di{" "}
          <a href="/" className="font-medium text-foreground underline underline-offset-4">
            halaman jadwal
          </a>
          .
        </p>
      )}
      <Frame>
        <FrameHeader className="flex-row items-baseline justify-between gap-2">
          <FrameTitle>
            <h2>{ramadan}</h2>
          </FrameTitle>
          <FrameDescription>Imsak tanda mulai puasa, Maghrib waktu berbuka</FrameDescription>
        </FrameHeader>
        <FramePanel className="p-0" aria-busy={isRefetching}>
          {isError ? (
            <Alert variant="destructive" className="m-4 w-auto">
              <CircleAlert aria-hidden="true" />
              <AlertTitle>Jadwal imsakiyah gagal dimuat</AlertTitle>
              <AlertDescription>Periksa koneksi internet, lalu coba lagi.</AlertDescription>
              <AlertAction>
                <Button type="button" variant="outline" onClick={() => refetch()}>
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
                <Button type="button" variant="outline" onClick={() => refetch()}>
                  <RefreshCw aria-hidden="true" data-icon="inline-start" />
                  Muat ulang
                </Button>
              </EmptyContent>
            </Empty>
          )}
        </FramePanel>
      </Frame>
      <p className="text-sm text-muted-foreground">
        Tanggal mengikuti kalender hijriah Umm al-Qura. Awal Ramadan resmi ditetapkan
        Kemenag RI lewat sidang isbat dan bisa bergeser satu hari. Waktu sholat dihitung
        dengan metode Kemenag RI.
      </p>
    </>
  );
}
