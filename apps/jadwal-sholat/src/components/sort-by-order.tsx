import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "~components/ui/button";
import { cn } from "~lib/utils/cn";

interface SortByOrderProps {
  isAscending: boolean;
  setIsAscending: (isAscending: boolean) => void;
}

export default function SortByOrder(
  { isAscending, setIsAscending }: SortByOrderProps
) {
  return (
    <div className="w-full flex justify-end items-center">
      <Button
        className={cn("flex justify-center items-center")}
        onClick={() => setIsAscending(!isAscending)}
      >
        <span className="font-medium">Sort By: </span>
        <div className="flex space-x-1 ml-1 justify-center items-center">
          <span className="font-bold">
            {isAscending ? "Ascending" : "Descending"}
          </span>
          {isAscending ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
        </div>
      </Button>
    </div>
  );
}
