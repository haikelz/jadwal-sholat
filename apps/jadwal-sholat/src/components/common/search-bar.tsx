"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { Options } from "nuqs";
import { useEffect, useId } from "react";

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

  // Desktop shortcut: "/" jumps to search, unless the reader is already
  // typing somewhere or holding a modifier.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey)
        return;
      const target = event.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        target?.closest("input, textarea, select, [role='combobox']")
      )
        return;
      event.preventDefault();
      document.getElementById(inputId)?.focus();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inputId]);

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
          aria-keyshortcuts="/"
        />
        <InputGroupAddon align="inline-end" className="hidden md:flex">
          <kbd className="rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground">
            /
          </kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
