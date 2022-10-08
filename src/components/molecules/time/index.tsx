import { useAtom } from "jotai";
import { useEffect } from "react";
import { dateAtom } from "@/src/store";

const Time = () => {
  const [date, setDate] = useAtom(dateAtom);

  useEffect(() => {
    setInterval(() => setDate(new Date()), 1000);
  }, [setDate]);

  return (
    <div className="flex gap-1 text-xl font-bold">
      <p>
        {date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        ,
      </p>
      <p>
        {date.toLocaleString("id-ID", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        })}
      </p>
    </div>
  );
};

export default Time;
