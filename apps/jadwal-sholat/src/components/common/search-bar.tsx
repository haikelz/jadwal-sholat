"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { Options } from "nuqs";
import { useId } from "react";

interface SearchBarProps {
  name: string;
  placeholder?: string;
  value: string | null;
  setSearch: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;
}

export function SearchBar({
  name,
  placeholder = "Cari...",
  value,
  setSearch,
}: SearchBarProps) {
  const inputId = useId();

  return (
    <div className="w-full sm:max-w-xs">
      <label className="sr-only" htmlFor={inputId}>
        Cari konten
      </label>
      <InputGroup>
        <InputGroupAddon>
          <Search aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput
          id={inputId}
          name={name}
          type="search"
          autoComplete="off"
          placeholder={placeholder}
          value={value ?? ""}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
    </div>
  );
}
