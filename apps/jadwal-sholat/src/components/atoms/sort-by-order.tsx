import { cx } from "classix";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface SortByOrderProps {
  isAscending: boolean;
  setIsAscending: Dispatch<SetStateAction<boolean>>;
}

export function SortByOrder({ isAscending, setIsAscending }: SortByOrderProps): JSX.Element {
  return (
    <div className="w-full flex justify-end items-center">
      <div
        className={cx(
          "flex px-2 py-1 justify-center  rounded-md",
          "dark:text-white items-center bg-gray-200 dark:bg-gray-800"
        )}
      >
        <span className="font-normal">Sort By: </span>
        <button
          type="button"
          aria-label="sort"
          onClick={() => setIsAscending((prev) => !prev)}
          className="flex space-x-1 ml-2 justify-center items-center"
        >
          <span className="font-semibold">{isAscending ? "Ascending" : "Descending"}</span>
          {isAscending ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
        </button>
      </div>
    </div>
  );
}
