import { ofetch } from "ofetch";
import useSWR from "swr";

async function getData(link: string) {
  const response = await ofetch(link, { parseResponse: JSON.parse });
  return response;
}

export function useFetch(link: string) {
  const { data, isLoading, error } = useSWR(link, getData, {
    keepPreviousData: true,
  });

  return {
    data,
    isLoading,
    isError: error,
  };
}
