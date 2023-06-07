import useSWR from "swr";
import { ofetch } from "~lib/utils/configuredOfetch";

export function useFetch(link: string) {
  async function getData(link: string) {
    const response = await ofetch(link);
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
