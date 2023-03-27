import { format } from "date-fns";
import id from "date-fns/locale/id";
import { memo } from "react";
import { useDate } from "~hooks";

export default function Time() {
  const formattedDate: string = format(useDate(), `dd MMMM yyyy, kk.mm.ss`, { locale: id });

  return (
    <div className="flex space-x-1">
      <p className="text-xl font-bold">{formattedDate}</p>
    </div>
  );
}

memo(Time);
