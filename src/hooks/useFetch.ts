import { ofetch } from "ofetch";
import useSWR from "swr";

export function useFetch(link: string) {
  async function getData(link: string) {
    const response = await ofetch(link, { parseResponse: JSON.parse });
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
