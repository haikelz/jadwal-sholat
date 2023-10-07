import { cx } from "classix";
import { Dispatch, SetStateAction } from "react";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";

interface SortByOrderProps {
  isAscending: boolean;
  setIsAscending: Dispatch<SetStateAction<boolean>>;
}

export function SortByOrder({ isAscending, setIsAscending }: SortByOrderProps) {
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
          {isAscending ? <MdArrowUpward /> : <MdArrowDownward />}
        </button>
      </div>
    </div>
  );
}
