import _fetch from "isomorphic-fetch";
import useSWR from "swr";

async function getData(link: string) {
  const response: Response = await _fetch(link);
  const data = await response.json();
  return data;
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
