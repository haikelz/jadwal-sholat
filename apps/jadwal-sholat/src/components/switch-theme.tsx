"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function SwitchTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      aria-label="switch theme"
      size="icon"
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
    </Button>
  );
}
