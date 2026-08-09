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
      <div className="flex mb-4 flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <h1 className={cn("text-3xl font-bold tracking-wide sm:text-4xl")}>
            Jadwal Sholat
          </h1>
          <Image
            src="/img/mosque.webp"
            width={40}
            height={40}
            alt=""
            fetchPriority="high"
            draggable={false}
          />
        </div>
        <p
          data-cy="description"
          className="mt-2 max-w-2xl text-base font-medium leading-relaxed sm:text-lg"
        >
          Berikut Jadwal Sholat untuk bulan ini, {currentDate} di wilayah{" "}
          <UserLocation />
        </p>
      </div>
      <div className="flex mb-7 flex-col items-center justify-center">
        <Button
          className="font-bold space-x-2 justify-center items-center flex"
          onClick={() => setIsOpenMap(!isOpenMap)}
        >
          <MapPin size={20} />
          <span>Atur lokasi</span>
        </Button>
      </div>
      <div className="flex w-full items-center overflow-x-auto text-center lg:justify-center">
        <Jadwal waktu={waktu} />
      </div>
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
