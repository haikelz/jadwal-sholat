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
import { cn } from "@/lib/utils/cn";
import { bulan, currentDate, tahun } from "@/lib/utils/constants";
import useGlobalStore from "@/store";
import { MapPin } from "lucide-react";
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

  const { data, isPending, isError, isRefetching } = useFetch(
    `${NEXT_PUBLIC_JADWAL_SHOLAT_API}/${formatDate}?latitude=${position.lat}&longitude=${position.lng}&method=20`,
  );

  if ((!data && isError) || isPending) return <LoadingClient />;
  if (isError || typeof data.data === "undefined") return <ErrorWhileFetch />;
  if (isRefetching) return <IsRefetching />;

  const waktu = data.data;

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
      <section aria-label="Jadwal sholat" className="w-full">
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
