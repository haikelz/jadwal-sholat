import { useAtom } from "jotai";
import { useEffect } from "react";
import { dateAtom } from "@/src/store";
import { format } from "date-fns";

const Time = () => {
  const [date, setDate] = useAtom(dateAtom);
  const formattedDate: string = format(date, `dd MMMM yyyy, kk.mm.ss`);

  useEffect(() => {
    const interval: NodeJS.Timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, [setDate]);

  return (
    <div className="flex gap-1">
      <p className="text-xl font-bold">{formattedDate}</p>
    </div>
  );
};

export default Time;
