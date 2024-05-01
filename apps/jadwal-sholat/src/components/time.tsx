"use client";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import { memo, useEffect } from "react";
import useGlobalStore from "~store";

export default function Time() {
  const { date, setDate } = useGlobalStore((state) => ({
    date: state.date,
    setDate: state.setDate,
  }));

  const formattedDate: string = format(date, `dd MMMM yyyy, kk.mm.ss`, {
    locale: id,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(() => new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [setDate]);

  return (
    <p className="text-xl font-bold" data-cy="time">
      {formattedDate}
    </p>
  );
}

memo(Time);
