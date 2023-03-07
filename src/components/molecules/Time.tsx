import { format } from "date-fns";
import { useDate } from "~hooks/useDate";

const Time = () => {
  const formattedDate: string = format(useDate(), `dd MMMM yyyy, kk.mm.ss`);

  return (
    <div className="flex space-x-1">
      <p className="text-xl font-bold">{formattedDate}</p>
    </div>
  );
};

export default Time;
