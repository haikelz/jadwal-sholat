"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  applyDisplaySize,
  DISPLAY_SIZES,
  readDisplaySize,
  type DisplaySize,
} from "@/lib/utils/display-settings";
import { ALargeSmall } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useId, useState } from "react";

const THEMES = [
  { value: "light", label: "Terang" },
  { value: "dark", label: "Gelap" },
  { value: "system", label: "Ikuti perangkat" },
];

function SettingGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const labelId = useId();

  return (
    <div className="flex flex-col gap-2">
      <p id={labelId} className="text-sm font-medium">
        {label}
      </p>
      <ToggleGroup
        type="single"
        variant="outline"
        value={value}
        aria-labelledby={labelId}
        // A single group always keeps one choice; ignore the deselect event.
        onValueChange={(next) => {
          if (next) onChange(next);
        }}
        className="flex-wrap"
      >
        {options.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

/** Theme, text size and Arabic size, in one labeled dialog in the top bar. */
export function DisplaySettings() {
  const { theme, setTheme } = useTheme();
  const [textSize, setTextSize] = useState<DisplaySize>("normal");
  const [arabicSize, setArabicSize] = useState<DisplaySize>("normal");

  // The <head> script already applied the saved sizes; mirror them here.
  useEffect(() => {
    setTextSize(readDisplaySize("text-size"));
    setArabicSize(readDisplaySize("arabic-size"));
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="ghost">
          <ALargeSmall aria-hidden="true" data-icon="inline-start" />
          Tampilan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tampilan</DialogTitle>
          <DialogDescription>
            Atur tema dan ukuran huruf agar nyaman dibaca. Pilihan ini
            tersimpan di perangkat ini.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <SettingGroup
            label="Tema"
            value={theme ?? "system"}
            options={THEMES}
            onChange={setTheme}
          />
          <SettingGroup
            label="Ukuran teks"
            value={textSize}
            options={DISPLAY_SIZES}
            onChange={(size) => {
              setTextSize(size as DisplaySize);
              applyDisplaySize("text-size", size as DisplaySize);
            }}
          />
          <div className="flex flex-col gap-3">
            <SettingGroup
              label="Ukuran huruf Arab"
              value={arabicSize}
              options={DISPLAY_SIZES}
              onChange={(size) => {
                setArabicSize(size as DisplaySize);
                applyDisplaySize("arabic-size", size as DisplaySize);
              }}
            />
            <p
              lang="ar"
              dir="rtl"
              aria-hidden="true"
              className="arabic-font text-right [--arabic-size:1.875rem]"
            >
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
