"use client";

import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";
import useGlobalStore from "~store";

interface UseAscendingProps {
  isAscending: boolean;
  setIsAscending: (isAscending: boolean) => void;
  deferredSearch: string;
}

/**
 * @param {string} search - search value
 * @returns {UseAscendingProps} an object that contains isAscending boolean, setIsAscending setter, and deferredSearch value
 */
export function useAscending(search: string): UseAscendingProps {
  const { isAscending, setIsAscending } = useGlobalStore((state) => ({
    isAscending: state.isAscending,
    setIsAscending: state.setIsAscending,
  }));
  const deferredSearch = useDeferredValue(search);

  return { isAscending, setIsAscending, deferredSearch };
}
