import { useEffect, useState } from "react";

const Time = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDate(new Date()), 1000);
  }, []);

  return (
    <div className="flex text-lg gap-1 font-bold">
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
