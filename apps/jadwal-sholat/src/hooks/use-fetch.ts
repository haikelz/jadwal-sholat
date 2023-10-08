"use client";

import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getData } from "~lib/utils/axios-config";

/**
 * A reusable useQuery with additional configuration
 * @param {string} link - link API
 * @returns {UseQueryResult<any, unknown>} configured useQuery
 */
export function useFetch(link: string): UseQueryResult<any, unknown> {
  return useQuery({
    queryKey: [link],
    queryFn: () => getData(link),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
