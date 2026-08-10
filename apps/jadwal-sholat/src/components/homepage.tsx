"use client";

import { ErrorWhileFetch } from "@/components/react-query/error-while-fetch";
import { IsRefetching } from "@/components/react-query/is-refetching";
import { LoadingClient } from "@/components/react-query/loading-client";
import { Jadwal } from "@/components/table-jadwal-sholat";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { env } from "@/env.mjs";
import { useFetch, useGeolocation } from "@/hooks";
import { JadwalSholatProps } from "@/interfaces";
import { formatSholatTime } from "@/lib/helpers";
import { bulan, currentDate, matchDate, tahun } from "@/lib/utils/constants";
import useGlobalStore from "@/store";
import { Clock3, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

const { NEXT_PUBLIC_JADWAL_SHOLAT_API } = env;

const Map = dynamic(() => import("@/components/map").then((mod) => mod.Map), {
  loading: () => (
    <div className="md:h-[620px] w-full h-[300px] animate-pulse bg-gray-100 dark:bg-gray-900"></div>
  ),
  ssr: false,
});
const UserLocation = dynamic(
  () => import("@/components/user-location").then((mod) => mod.UserLocation),
  {
    ssr: false,
  },
);
const Adzan = dynamic(
  () => import("@/components/adzan").then((mod) => mod.Adzan),
  {
    ssr: false,
  },
);

export function Homepage() {
  const { position, isOpenMap, setIsOpenMap } = useGlobalStore((state) => ({
    position: state.position,
    isOpenMap: state.isOpenMap,
    setIsOpenMap: state.setIsOpenMap,
  }));

  const formatDate: string = `${tahun}/${bulan}`;

  useGeolocation();

  const { data, isPending, isError, isRefetching } = useFetch<{
    data: JadwalSholatProps[];
  }>(
    `${NEXT_PUBLIC_JADWAL_SHOLAT_API}/${formatDate}?latitude=${position.lat}&longitude=${position.lng}&method=20`,
  );

  if ((!data && isError) || isPending) return <LoadingClient />;
  if (isError || !data?.data) return <ErrorWhileFetch />;
  if (isRefetching) return <IsRefetching />;

  const waktu = data.data;
  const jadwalHariIni = waktu.find(
    (item) => item.date.gregorian.date === matchDate,
  );
  const waktuHariIni = jadwalHariIni
    ? [
        { name: "Imsak", time: jadwalHariIni.timings.Imsak },
        { name: "Subuh", time: jadwalHariIni.timings.Fajr },
        { name: "Terbit", time: jadwalHariIni.timings.Sunrise },
        { name: "Dzuhur", time: jadwalHariIni.timings.Dhuhr },
        { name: "Ashar", time: jadwalHariIni.timings.Asr },
        { name: "Terbenam", time: jadwalHariIni.timings.Sunset },
        { name: "Maghrib", time: jadwalHariIni.timings.Maghrib },
        { name: "Isya", time: jadwalHariIni.timings.Isha },
      ]
    : [];

  return (
    <>
      <Adzan waktu={waktu} />
      <header className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
            Jadwal Sholat
          </h1>
          <span className="flex size-11 items-center justify-center rounded-xl bg-muted sm:size-12">
            <Image
              src="/img/mosque.webp"
              width={32}
              height={32}
              alt=""
              loading="eager"
              fetchPriority="high"
              draggable={false}
            />
          </span>
        </div>
        <p
          data-cy="description"
          className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Jadwal sholat bulan ini untuk {currentDate} di wilayah{" "}
          <UserLocation />
        </p>
      </header>
      <div className="flex flex-col items-center justify-center">
        <Button
          className="flex items-center justify-center font-semibold"
          onClick={() => setIsOpenMap(!isOpenMap)}
        >
          <MapPin aria-hidden="true" size={18} />
          <span>Atur lokasi</span>
        </Button>
      </div>
      <section
        aria-labelledby="jadwal-hari-ini"
        className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border bg-card shadow-sm"
      >
        <div className="flex items-center gap-3 border-b bg-muted/60 px-4 py-4 sm:px-6">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Clock3 aria-hidden="true" className="size-5" />
          </span>
          <div className="min-w-0 text-left">
            <h2
              id="jadwal-hari-ini"
              className="text-lg font-bold tracking-tight sm:text-xl"
            >
              Jadwal hari ini
            </h2>
            <p className="text-sm text-muted-foreground">{currentDate}</p>
          </div>
        </div>
        {waktuHariIni.length > 0 ? (
          <dl className="grid grid-cols-4 gap-x-3 gap-y-5 p-4 sm:grid-cols-8 sm:px-6 sm:py-5">
            {waktuHariIni.map((item) => (
              <div key={item.name} className="min-w-0 text-left">
                <dt className="truncate text-xs font-medium text-muted-foreground">
                  {item.name}
                </dt>
                <dd className="mt-1 text-base font-bold tabular-nums sm:text-lg">
                  {formatSholatTime(item.time)}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="px-4 py-6 text-center text-sm text-muted-foreground sm:px-6">
            Jadwal hari ini belum tersedia.
          </p>
        )}
      </section>
      <section aria-labelledby="jadwal-bulan-ini" className="w-full">
        <div className="mb-4 text-left">
          <h2
            id="jadwal-bulan-ini"
            className="text-xl font-bold tracking-tight sm:text-2xl"
          >
            Jadwal bulan ini
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Lihat jadwal lengkap untuk setiap tanggal.
          </p>
        </div>
        <Jadwal waktu={waktu} />
      </section>
      <Dialog open={isOpenMap} onOpenChange={setIsOpenMap}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-[calc(100%-2rem)] overflow-y-auto sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Pilih lokasi untuk jadwal sholat</DialogTitle>
            <DialogDescription>
              Cari atau geser peta, lalu pilih lokasi yang diinginkan.
            </DialogDescription>
          </DialogHeader>
          <Map />
          <DialogClose asChild>
            <Button type="button" className="mx-auto w-[100px] font-bold">
              Tutup
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
