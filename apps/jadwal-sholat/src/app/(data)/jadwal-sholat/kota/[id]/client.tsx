"use client";

import { cx } from "classix";
import { ErrorWhileFetch, LoadingClient } from "~components/molecules";
import { TableJadwalSholat } from "~components/organisms";
import { env } from "~env.mjs";
import { useFetch } from "~hooks";
import { bulan, currentDate, hari, tahun } from "~lib/utils/constants";
import { bitter } from "~lib/utils/fonts";

const { NEXT_PUBLIC_JADWAL_SHOLAT_API } = env;

export default function Client({ id }: { id: string }): JSX.Element {
  const formatDate: string = `${tahun}/${bulan}`;

  const { data, isPending, isError } = useFetch(
    id ? `${NEXT_PUBLIC_JADWAL_SHOLAT_API}/jadwal/${id}/${formatDate}` : ""
  );

  if ((!data && isError) || isPending) return <LoadingClient />;
  if (isError || typeof data.data === "undefined") return <ErrorWhileFetch />;

  const waktu = data.data;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1
          className={cx(
            "text-3xl font-bold tracking-wide sm:text-4xl",
            bitter.className
          )}
        >
          {waktu.lokasi}
        </h1>
        <p className="text-lg font-medium">
          PROVINSI {waktu.daerah}, {currentDate.toUpperCase()}
        </p>
      </div>
      <div className="flex w-full items-center overflow-x-auto text-center lg:justify-center">
        <TableJadwalSholat
          tanggal={hari}
          tahun={tahun}
          bulan={bulan}
          waktu={waktu}
        />
      </div>
    </>
  );
}
