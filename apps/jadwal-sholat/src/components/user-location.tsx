"use client";

import { env } from "@/lib/utils/public-env";
import { UserLocationProps } from "@/interfaces";
import useGlobalStore from "@/store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/utils/get-data";

const { NEXT_PUBLIC_NOMINATIM_API } = env;

async function getUserCurrentLocation(
  lat: number,
  lng: number,
): Promise<UserLocationProps | undefined> {
  try {
    return await getData<UserLocationProps>(
      `${NEXT_PUBLIC_NOMINATIM_API}/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
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
    queryKey: [position.lat, position.lng],
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
