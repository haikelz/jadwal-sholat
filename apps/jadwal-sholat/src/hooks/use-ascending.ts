"use client";

import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";

interface UseAscendingProps {
  isAscending: boolean;
  setIsAscending: Dispatch<SetStateAction<boolean>>;
  deferredSearch: string;
}

export function useAscending(search: string): UseAscendingProps {
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const deferredSearch = useDeferredValue(search);

  return { isAscending, setIsAscending, deferredSearch };
}
