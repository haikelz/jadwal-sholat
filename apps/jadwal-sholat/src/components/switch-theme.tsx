"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { match } from "ts-pattern";
import { Button } from "~components/ui/button";

export default function SwitchTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      aria-label="switch theme"
      size="icon"
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {match(theme)
        .with("light", () => <Moon size={24} />)
        .otherwise(() => (
          <Sun size={24} />
        ))}
    </Button>
  );
}
