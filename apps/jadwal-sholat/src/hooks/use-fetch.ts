import {
  UseQueryResult,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import { getData } from "~lib/utils/axios-config";

/**
 * A reusable useQuery with additional configuration
 * @export
 * @param {string} link - API link
 * @returns {UseQueryResult<any, Error>} configured useQuery
 */
export function useFetch(link: string): UseQueryResult<any, Error> {
  return useQuery({
    queryKey: [link],
    queryFn: () => getData(link),
    /**
     * @see https://tanstack.com/query/v5/docs/react/guides/migrating-to-v5#removed-keeppreviousdata-in-favor-of-placeholderdata-identity-function
     */
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
