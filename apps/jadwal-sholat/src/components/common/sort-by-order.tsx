import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

interface SortByOrderProps {
  isAscending: boolean;
  setIsAscending: (isAscending: boolean) => void;
}

export function SortByOrder({ isAscending, setIsAscending }: SortByOrderProps) {
  return (
    <div className="w-full flex justify-end items-center">
      <Button
        onClick={() => setIsAscending(!isAscending)}
      >
        <span>Urutkan:</span>
        <span className="font-bold">{isAscending ? "Naik" : "Turun"}</span>
        {isAscending ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
      </Button>
    </div>
  );
}
