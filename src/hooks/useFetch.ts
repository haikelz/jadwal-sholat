import useSWR from "swr";

const getData = async (link: string) => {
  const response: Response = await fetch(link);
  const data = await response.json();

  return data;
};

export const useFetch = (link: string | null) => {
  const { data, error } = useSWR(link, getData);

  return {
    data: data,
    isLoading: !data && !error,
    isError: error,
  };
};
