import { format } from "date-fns";
import { getDate } from "~lib/helpers/getDate";

const Time = () => {
  const formattedDate: string = format(getDate(), `dd MMMM yyyy, kk.mm.ss`);

  return (
    <div className="flex space-x-1">
      <p className="text-xl font-bold">{formattedDate}</p>
    </div>
  );
};

export default Time;
