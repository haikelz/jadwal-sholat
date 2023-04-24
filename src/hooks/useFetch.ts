import useSWR from "swr";
import useAppStore from "~store";

export function useFetch(link: string) {
  const getData = useAppStore((state) => state.getData);

  const { data, isLoading, error } = useSWR(link, getData, {
    keepPreviousData: true,
  });

  return {
    data,
    isLoading,
    isError: error,
  };
}
