import { useQuery } from "@tanstack/react-query";

const getData = async (link: string) => {
  const response: Response = await fetch(link);
  const data = await response.json();

  return data;
};

export const useFetch = (link: string) => {
  return useQuery(["get data", link], () => getData(link), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
