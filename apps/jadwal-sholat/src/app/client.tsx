"use client";

import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import ErrorWhileFetch from "~components/error-while-fetch";
import IsRefetching from "~components/is-refetching";
import LoadingClient from "~components/loading-client";
import Jadwal from "~components/table-jadwal-sholat";
import { Button } from "~components/ui/button";
import { env } from "~env.mjs";
import { useFetch, useGeolocation } from "~hooks";
import { cn } from "~lib/utils/cn";
import { bulan, currentDate, tahun } from "~lib/utils/constants";
import { bitter } from "~lib/utils/fonts";
import useGlobalStore from "~store";

const { NEXT_PUBLIC_JADWAL_SHOLAT_API } = env;

const Map = dynamic(() => import("~components/map"), {
  loading: () => (
    <div className="md:h-[620px] w-full h-[300px] animate-pulse bg-gray-100 dark:bg-gray-900"></div>
  ),
  ssr: false,
});
const UserLocation = dynamic(() => import("~components/user-location"), {
  ssr: false,
});
const Adzan = dynamic(() => import("~components/adzan"), {
  ssr: false,
});

export default function JadwalSholatClient() {
  const { position, isOpenMap, setIsOpenMap } = useGlobalStore((state) => ({
    position: state.position,
    isOpenMap: state.isOpenMap,
    setIsOpenMap: state.setIsOpenMap,
  }));

  const formatDate: string = `${tahun}/${bulan}`;

  useGeolocation();

  const { data, isPending, isError, isRefetching } = useFetch(
    `${NEXT_PUBLIC_JADWAL_SHOLAT_API}/${formatDate}?latitude=${position.lat}&longitude=${position.lng}&method=20`
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
          <h1
            className={cn(
              "text-3xl font-bold tracking-wide sm:text-4xl",
              bitter.className
            )}
          >
            Jadwal Sholat
          </h1>
          <Image
            src="/img/mosque.webp"
            width={40}
            height={40}
            alt="Mosque"
            fetchPriority="high"
            draggable={false}
          />
        </div>
        <p data-cy="description" className="mt-2 text-lg font-medium">
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
          <span>Set your Location</span>
        </Button>
      </div>
      <div className="flex w-full items-center overflow-x-auto text-center lg:justify-center">
        <Jadwal waktu={waktu} />
      </div>
      {isOpenMap ? (
        <div
          className={cn(
            "modal-blur fixed inset-0 p-4 top-0 z-50",
            "flex min-h-screen w-full items-center justify-center",
            "overflow-x-hidden"
          )}
        >
          <div
            className={cn(
              "relative w-full rounded-lg p-4 bg-white",
              "dark:bg-gray-950 border border-input dark:text-white"
            )}
          >
            <Map />
            <Button
              type="button"
              aria-label="close map"
              onClick={() => setIsOpenMap(false)}
              className="font-bold mt-4 w-[100px]"
            >
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
