"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function SwitchTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      aria-label={
        theme === "dark" ? "Gunakan tema terang" : "Gunakan tema gelap"
      }
      size="icon"
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <Moon aria-hidden="true" size={20} />
      ) : (
        <Sun aria-hidden="true" size={20} />
      )}
    </Button>
  );
}
