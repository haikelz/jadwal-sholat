import useSWR from "swr";
import { configuredOfetch } from "~lib/utils/configuredOfetch";

export function useFetch(link: string) {
  async function getData(link: string) {
    const response = await configuredOfetch(link);
    return response;
  }

  const { data, isLoading, error } = useSWR(link, getData, {
    keepPreviousData: true,
  });

  return {
    data,
    isLoading,
    isError: error,
  };
}
