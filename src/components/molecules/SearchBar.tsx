import { clsx } from "clsx";
import { ChangeEventHandler, Dispatch, memo, SetStateAction, useRef } from "react";
import { MdSearch } from "react-icons/md";
import { useKeydown } from "~hooks/useKeydown";

type SearchBarProps = {
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

const SearchBar = ({ setSearchTerm }: SearchBarProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchTerm(event.target.value);
  };

  useKeydown({ ref: ref, isShiftKey: true, key1: "Enter", key2: "Escape" });

  return (
    <div className="flex flex-col">
      <div className="relative flex items-center justify-center">
        <div className="absolute left-0 pl-3">
          <MdSearch size={23} className="text-gray-400" />
        </div>
        <input
          ref={ref}
          className={clsx(
            "block w-[250px] rounded-md border-2 border-solid border-gray-400 bg-gray-50 bg-clip-padding",
            "px-3 py-1 pl-10 font-semibold transition ease-in-out",
            "placeholder:ml-6",
            "focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600",
            "dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500"
          )}
          type="text"
          placeholder="Search...."
          onChange={handleChange}
        />
      </div>
      <span className="mt-1.5 hidden md:inline-block">
        <kbd
          className={clsx(
            "rounded-sm bg-blue-400 px-1.5 py-0.5 text-sm font-semibold",
            "text-black shadow-sm",
            "dark:bg-blue-500"
          )}
        >
          Shift
        </kbd>{" "}
        <b>+</b>{" "}
        <kbd
          className={clsx(
            "rounded-sm bg-blue-400 px-1.5 py-0.5 text-sm font-semibold",
            "text-black shadow-sm",
            "dark:bg-blue-500"
          )}
        >
          Enter
        </kbd>
      </span>
    </div>
  );
};

export default memo(SearchBar);
