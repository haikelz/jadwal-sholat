import { useEffect } from "react";
import useAppStore from "~store";

export const useDate = () => {
  const { date, setDate } = useAppStore((state) => state);

  useEffect(() => {
    const interval = setInterval(() => setDate(() => new Date()), 1000);
    return () => clearInterval(interval);
  }, [setDate]);

  return date;
};
