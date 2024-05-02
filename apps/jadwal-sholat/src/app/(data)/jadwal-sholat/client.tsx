"use client";

import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import ErrorWhileFetch from "~components/error-while-fetch";
import IsRefetching from "~components/is-refetching";
import Jadwal from "~components/jadwal";
import LoadingClient from "~components/loading-client";
import { Button } from "~components/ui/button";
import { env } from "~env.mjs";
import { useFetch } from "~hooks";
import { cn } from "~lib/utils/cn";
import { bulan, tahun } from "~lib/utils/constants";
import useGlobalStore from "~store";

const { NEXT_PUBLIC_JADWAL_SHOLAT_API } = env;

const Map = dynamic(() => import("~components/map"), {
  loading: () => (
    <div className="lg:h-[620px] w-full h-[300px] lg:w-[1200px] animate-pulse bg-gray-100 dark:bg-gray-900"></div>
  ),
});

export default function JadwalSholatClient() {
  const { position, isOpenMap, setIsOpenMap } = useGlobalStore((state) => ({
    position: state.position,
    isOpenMap: state.isOpenMap,
    setIsOpenMap: state.setIsOpenMap,
  }));

  const formatDate: string = `${tahun}/${bulan}`;

  const { data, isPending, isError, isRefetching } = useFetch(
    `${NEXT_PUBLIC_JADWAL_SHOLAT_API}/${formatDate}?latitude=${position.lat}&longitude=${position.lng}&method=20`
  );

  if ((!data && isError) || isPending) return <LoadingClient />;
  if (isError || typeof data.data === "undefined") return <ErrorWhileFetch />;
  if (isRefetching) return <IsRefetching />;

  const waktu = data.data;

  return (
    <>
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
