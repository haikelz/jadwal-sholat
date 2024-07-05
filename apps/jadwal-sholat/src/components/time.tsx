"use client";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect } from "react";
import { cn } from "~lib/utils/cn";
import { hours } from "~lib/utils/constants";
import { bitter } from "~lib/utils/fonts";
import useGlobalStore from "~store";

export default function Time() {
  const { date, setDate } = useGlobalStore((state) => ({
    date: state.date,
    setDate: state.setDate,
  }));

  const formattedDate: string = format(date, `EEEE, dd MMMM yyyy, kk.mm.ss`, {
    locale: id,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(() => new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [setDate]);

  return (
    <>
      <h1
        className={cn(
          "text-3xl font-bold tracking-wide sm:text-4xl",
          bitter.className
        )}
      >
        {`Selamat ${
          Number(hours) >= 12 && Number(hours) < 15
            ? "Siang"
            : Number(hours) >= 15 && Number(hours) < 18
            ? "Sore"
            : Number(hours) >= 18 && Number(hours) < 24
            ? "Malam"
            : "Pagi"
        }`}
      </h1>
      <p className="mb-1 mt-2 text-lg font-medium md:text-xl">
        &#34;Maka nikmat Tuhanmu yang manakah yang kamu dustakan&#34;
        <br />
        Ar-Rahman ayat 13
      </p>
      <p className="text-xl font-bold" data-cy="time">
        {formattedDate}
      </p>
    </>
  );
}
