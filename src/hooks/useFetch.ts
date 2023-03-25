import _fetch from "isomorphic-fetch";

import useSWR from "swr";

const getData = async (link: string) => {
  const response: Response = await _fetch(link);
  const data = await response.json();
  return data;
};

export const useFetch = (link: string) => {
  const { data, isLoading, error } = useSWR(link, getData, { keepPreviousData: true });

  return {
    data,
    isLoading,
    isError: error,
  };
};
