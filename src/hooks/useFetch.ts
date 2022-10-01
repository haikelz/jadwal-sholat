import useSWR from "swr";

const getData = async (link: string) => {
  const response = await fetch(link);
  const data = await response.json();

  return data;
};

export const useFetch = (link: string) => {
  const { data, error } = useSWR(link, getData, {
    keepPreviousData: true,
  });

  return {
    data: data,
    isLoading: !data && !error,
    isError: error,
  };
};
