"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";
import { Search } from "lucide-react";
import { Options } from "nuqs";
import { useId } from "react";

interface SearchBarProps {
  name: string;
  placeholder?: string;
  setSearch: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;
}

export function SearchBar({
  name,
  placeholder = "Cari...",
  setSearch,
}: SearchBarProps) {
  const inputId = useId();

  return (
    <div className="relative flex w-full max-w-[300px] items-center justify-center">
      <label className="sr-only" htmlFor={inputId}>
        Cari konten
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 size-5"
      />
      <Input
        id={inputId}
        name={name}
        type="search"
        autoComplete="off"
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
        className={cn("w-full px-3 py-1 pl-10")}
      />
    </div>
  );
}
