import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";

interface UseAscendingProps {
  isAscending: boolean;
  setIsAscending: Dispatch<SetStateAction<boolean>>;
  deferredSearch: string;
}

/**
 * A custom hook to manage ascending - descending
 * @param {string} search - search value
 * @returns {UseAscendingProps} an object that contains isAscending boolean, setIsAscending setter, and deferredSearch value
 */
export function useAscending(search: string): UseAscendingProps {
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const deferredSearch = useDeferredValue(search);

  return { isAscending, setIsAscending, deferredSearch };
}
