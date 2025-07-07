"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";
import { Search } from "lucide-react";
import { Options } from "nuqs";

interface SearchBarProps {
  name: string;
  setSearch: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
}

export function SearchBar({ name, setSearch }: SearchBarProps) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute left-0 pl-3">
        <Search size={20} />
      </div>
      <Input
        type="text"
        placeholder="Search...."
        onChange={(e) => setSearch(e.target.value)}
        className={cn("w-[300px] placeholder:ml-6 px-3 py-1 pl-10")}
      />
    </div>
  );
}
