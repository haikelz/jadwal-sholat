import {
  UseQueryResult,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import { getData } from "@/lib/utils/get-data";

/**
 * A reusable useQuery with additional configuration
 * @export
 * @param {string} link - API link
 * @param {T} [initialData] - data the server already fetched for this link
 * @returns {UseQueryResult<any, Error>} configured useQuery
 */
export function useFetch<T = any>(
  link: string,
  initialData?: T,
): UseQueryResult<T, Error> {
  return useQuery({
    queryKey: [link],
    queryFn: () => getData<T>(link),
    // Server-rendered pages hand their data over here; it is fresh already.
    initialData,
    staleTime: initialData === undefined ? 0 : Infinity,
    /**
     * @see https://tanstack.com/query/v5/docs/react/guides/migrating-to-v5#removed-keeppreviousdata-in-favor-of-placeholderdata-identity-function
     */
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
