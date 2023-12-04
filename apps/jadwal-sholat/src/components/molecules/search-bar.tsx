"use client";

import { Search } from "lucide-react";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";
import { useCallback, useRef } from "react";
import { useKeydown } from "~hooks";
import { cx } from "~lib/helpers";

interface SearchBarProps {
  searchParams: ReadonlyURLSearchParams;
  name: string;
}

export function SearchBar({ searchParams, name }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const ref = useRef<HTMLInputElement>(null);

  useKeydown({ ref: ref, isShiftKey: true, key1: "Shift", key2: "Escape" });

  return (
    <div className="flex flex-col">
      <div className="relative flex items-center justify-center">
        <div className="absolute left-0 pl-3">
          <Search size={20} />
        </div>
        <input
          ref={ref}
          className={cx(
            "block w-[300px] rounded-md",
            "border-2 border-solid border-gray-400",
            "bg-gray-50 bg-clip-padding",
            "px-3 py-1 pl-10 font-semibold transition ease-in-out",
            "placeholder:ml-6",
            "focus:border-blue-600 focus:outline-none",
            "dark:border-gray-600 dark:bg-gray-700",
            "dark:placeholder-gray-400 dark:focus:border-blue-500"
          )}
          type="text"
          placeholder="Search...."
          onChange={(e) =>
            router.push(
              pathname + "?" + createQueryString(name, e.target.value)
            )
          }
        />
      </div>
      <div className="mt-1.5 hidden md:inline-block">
        <kbd
          className={cx(
            "rounded-sm bg-blue-400 px-1.5 py-0.5",
            "text-sm font-semibold",
            "text-black shadow-sm",
            "dark:bg-blue-500"
          )}
        >
          Shift
        </kbd>{" "}
        <b>+</b>{" "}
        <kbd
          className={cx(
            "rounded-sm bg-blue-400 px-1.5 py-0.5",
            "text-sm font-semibold",
            "text-black shadow-sm",
            "dark:bg-blue-500"
          )}
        >
          Enter
        </kbd>
      </div>
    </div>
  );
}
