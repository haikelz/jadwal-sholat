"use client";

import { useQuery } from "@tanstack/react-query";
import { getData } from "~lib/utils/axios-config";

export function useFetch(link: string) {
  return useQuery({
    queryKey: [link],
    queryFn: () => getData(link),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
