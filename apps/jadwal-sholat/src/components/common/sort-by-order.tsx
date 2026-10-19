import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

interface SortByOrderProps {
  isAscending: boolean;
  setIsAscending: (isAscending: boolean) => void;
}

export function SortByOrder({ isAscending, setIsAscending }: SortByOrderProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => setIsAscending(!isAscending)}
    >
      Urutkan: {isAscending ? "naik" : "turun"}
      {isAscending ? (
        <ArrowUp aria-hidden="true" data-icon="inline-end" />
      ) : (
        <ArrowDown aria-hidden="true" data-icon="inline-end" />
      )}
    </Button>
  );
}
