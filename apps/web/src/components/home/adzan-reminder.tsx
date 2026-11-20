import { Toggle } from "@/components/ui/toggle";
import type { JadwalSholatProps } from "@/interfaces";
import { Bell, BellOff } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";

// The player touches Audio, so it loads in the browser after mount.
const Adzan = lazy(() =>
  import("@/components/adzan").then((mod) => ({ default: mod.Adzan })),
);

const STORAGE_KEY = "adzan";

// 12 ms of silence. Playing it during a tap lets Safari play the same element
// later without one; other browsers only need the tap.
const SILENCE =
  "data:audio/wav;base64,UklGRogAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YWQAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA";

// One element for the whole page load. ClientRouter keeps the page loaded
// across navigations, so the tap that unlocked it still counts back on the
// homepage.
let adzanAudio: HTMLAudioElement | null = null;

function audioElement() {
  return (adzanAudio ??= new Audio());
}

function unlock() {
  const audio = audioElement();
  if (audio.src) return;
  audio.src = SILENCE;
  audio.play().catch(() => undefined);
}

type Choice = "on" | "off";

/**
 * Plays the adzan at prayer times unless the reader switched it off.
 * Browsers have no sound permission to ask for: a tap on the page allows
 * sound until it reloads. So the reader's first tap anywhere unlocks it, and
 * an installed app (Chrome) needs none.
 */
export function AdzanReminder({ waktu }: { waktu: JadwalSholatProps[] }) {
  // null until the saved choice is read after mount, so the adzan never
  // starts before an "off" is known.
  const [choice, setChoice] = useState<Choice | null>(null);

  useEffect(() => {
    try {
      setChoice(localStorage.getItem(STORAGE_KEY) === "off" ? "off" : "on");
    } catch {
      setChoice("on");
    }
  }, []);

  useEffect(() => {
    if (choice !== "on") return;
    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [choice]);

  const choose = (next: Choice) => {
    if (next === "on") unlock();
    setChoice(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Blocked storage: the choice holds until the page closes.
    }
  };

  const isOn = choice !== "off";

  return (
    <div className="flex flex-col items-start gap-1.5 pt-1">
      <Toggle
        variant="outline"
        pressed={isOn}
        onPressedChange={(pressed) => choose(pressed ? "on" : "off")}
      >
        {isOn ? (
          <Bell aria-hidden="true" data-icon="inline-start" />
        ) : (
          <BellOff aria-hidden="true" data-icon="inline-start" />
        )}
        Adzan otomatis
      </Toggle>
      <p className="text-sm text-muted-foreground">
        {isOn
          ? "Adzan berbunyi saat masuk waktu sholat, selama halaman ini terbuka."
          : "Adzan tidak diputar saat masuk waktu sholat."}
      </p>
      {choice === "on" && waktu.length > 0 ? (
        <Suspense fallback={null}>
          <Adzan waktu={waktu} audio={audioElement()} />
        </Suspense>
      ) : null}
    </div>
  );
}
