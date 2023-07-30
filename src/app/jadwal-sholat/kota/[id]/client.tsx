"use client";

import { cx } from "classix";
import dynamic from "next/dynamic";
import LoadingClient from "~components/loading-client";
import { TableJadwalSholat } from "~components/organisms";
import { env } from "~env.mjs";
import { useFetch } from "~hooks";
import { bulan, currentDate, hari, tahun } from "~lib/utils/constants";
import { bitter } from "~lib/utils/fonts";

const ErrorWhileFetch = dynamic(() =>
  import("~components/molecules").then((obj) => obj.ErrorWhileFetch)
);

const { NEXT_PUBLIC_JADWAL_SHOLAT_API } = env;

export default function Client({ id }: { id: string }) {
  const formatDate: string = `${tahun}/${bulan}`;
  const { data, isLoading, isError } = useFetch(
    id ? `${NEXT_PUBLIC_JADWAL_SHOLAT_API}/jadwal/${id}/${formatDate}` : ""
  );

  if ((!data && !isError) || isLoading) return <LoadingClient />;
  if (isError || typeof data.data === "undefined") return <ErrorWhileFetch />;

  const waktu = data.data;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className={cx("text-3xl font-bold tracking-wide sm:text-4xl", bitter.className)}>
          {waktu.lokasi}
        </h1>
        <p className="text-lg font-medium">
          PROVINSI {waktu.daerah}, {currentDate.toUpperCase()}
        </p>
      </div>
      <div className="flex w-full items-center overflow-x-auto text-center lg:justify-center">
        <TableJadwalSholat tanggal={hari} tahun={tahun} bulan={bulan} waktu={waktu} />
      </div>
    </>
  );
}
