"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { env } from "~env.mjs";
import { UserLocationProps } from "~interfaces";
import useGlobalStore from "~store";

const { NEXT_PUBLIC_NOMINATIM_API } = env;

async function getUserCurrentLocation(
  lat: number,
  lng: number
): Promise<UserLocationProps | undefined> {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_NOMINATIM_API}/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );

    return response.data as UserLocationProps;
  } catch (err) {
    console.log("Failed to get user location!");
  }
}

export default function UserLocation() {
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

  return (
    <span>
      {isPending || isRefetching
        ? ""
        : isError
        ? "-"
        : data?.address.city
        ? data.address.city
        : data?.address.village ? data.address.village : data?.address.county }
    </span>
  );
}
