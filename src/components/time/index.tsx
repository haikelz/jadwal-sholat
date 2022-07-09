import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { dateAtom } from "src/store";

const Time = () => {
  const [date, setDate] = useAtom(dateAtom);

  useEffect(() => {
    setInterval(() => setDate(new Date()), 1000);
  }, []);

  return (
    <div className="flex text-xl gap-1 font-bold">
      <p>
        {date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
        ,
      </p>
      <p>
        {date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })}
      </p>
    </div>
  );
};

export default Time;
