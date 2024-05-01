"use client";

import { Search } from "lucide-react";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";
import { useCallback } from "react";
import { Input } from "~components/ui/input";
import { cn } from "~lib/utils/cn";

interface SearchBarProps {
  searchParams: ReadonlyURLSearchParams;
  name: string;
}

export default function SearchBar({ searchParams, name }: SearchBarProps) {
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

  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute left-0 pl-3">
        <Search size={20} />
      </div>
      <Input
        type="text"
        placeholder="Search...."
        onChange={(e) =>
          router.push(pathname + "?" + createQueryString(name, e.target.value))
        }
        className={cn("w-[300px] placeholder:ml-6 px-3 py-1 pl-10")}
      />
    </div>
  );
}
