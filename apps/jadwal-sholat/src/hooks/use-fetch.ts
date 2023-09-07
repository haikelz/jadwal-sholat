"use client";

import useSWRImmutable from "swr/immutable";
import { getData } from "~lib/utils/axios-config";

export function useFetch(link: string) {
  async function fetcher(link: string) {
    const response = await getData(link);
    return response;
  }

  return useSWRImmutable(link, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
}
