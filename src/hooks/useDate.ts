import { useEffect } from "react";
import { shallow } from "zustand/shallow";
import useAppStore from "~store";

export function useDate() {
  const { date, setDate } = useAppStore(
    (state) => ({ date: state.date, setDate: state.setDate }),
    shallow
  );

  useEffect(() => {
    const interval = setInterval(() => setDate(() => new Date()), 1000);
    return () => clearInterval(interval);
  }, [setDate]);

  return date;
}
