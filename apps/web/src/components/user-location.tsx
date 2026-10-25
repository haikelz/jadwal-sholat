"use client";

import { env } from "@/lib/utils/public-env";
import type { UserLocationProps } from "@/interfaces";
import useGlobalStore from "@/store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/utils/get-data";
import { nominatimReverseUrl } from "@jadwal-sholat/core/api";

const { NOMINATIM_API } = env;

async function getUserCurrentLocation(
  lat: number,
  lng: number,
): Promise<UserLocationProps | undefined> {
  try {
    return await getData<UserLocationProps>(
      // accept-language=id names places in Indonesian ("Kota Bandung").
      nominatimReverseUrl(NOMINATIM_API, { lat, lng }),
    );
  } catch {
    // The label falls back to "lokasi terpilih".
    return undefined;
  }
}

export function UserLocation() {
  const { position } = useGlobalStore((state) => ({
    position: state.position,
  }));

  const { data, isPending, isError, isRefetching } = useQuery({
    // Include the language so cached English labels are not reused.
    queryKey: ["location", position.lat, position.lng, "id"],
    queryFn: () => getUserCurrentLocation(position.lat, position.lng),
    placeholderData: keepPreviousData,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const location =
    data?.address.city ??
    data?.address.village ??
    data?.address.county ??
    "lokasi terpilih";

  return (
    <span>
      {isPending || isRefetching || isError ? "lokasi terpilih" : location}
    </span>
  );
}
