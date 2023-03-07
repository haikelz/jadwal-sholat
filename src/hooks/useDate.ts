import { useAtom } from "jotai";
import { useEffect } from "react";
import { dateAtom } from "~store";

export const useDate = () => {
  const [date, setDate] = useAtom(dateAtom);

  useEffect(() => {
    const interval = setInterval(() => setDate(date), 1000);
    return () => clearInterval(interval);
  }, [date, setDate]);

  return date;
};
