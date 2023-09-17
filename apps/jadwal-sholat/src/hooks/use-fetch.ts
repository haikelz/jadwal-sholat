"use client";

import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getData } from "~lib/utils/axios-config";

export function useFetch(link: string): UseQueryResult<any, unknown> {
  return useQuery({
    queryKey: [link],
    queryFn: () => getData(link),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
