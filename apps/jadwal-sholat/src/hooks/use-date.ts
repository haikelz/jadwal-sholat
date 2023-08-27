"use client";

import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import useGlobalStore from "~store";

export function useDate() {
  const { date, setDate } = useGlobalStore(
    (state) => ({ date: state.date, setDate: state.setDate }),
    shallow
  );

  useEffect(() => {
    const interval = setInterval(() => setDate(() => new Date()), 1000);
    return () => clearInterval(interval);
  }, [setDate]);

  return date;
}
