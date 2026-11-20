import { Toggle } from "@/components/ui/toggle";
import type { JadwalSholatProps } from "@/interfaces";
import { Bell, BellOff } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";

// The player touches Audio, so it loads in the browser after mount.
const Adzan = lazy(() =>
  import("@/components/adzan").then((mod) => ({ default: mod.Adzan })),
);

/**
 * The switch for the adzan, and the player itself. On by default; switching
 * it off is saved on this device and unmounts the player, which stops an
 * adzan already playing.
 */
export function AdzanReminder({ waktu }: { waktu: JadwalSholatProps[] }) {
  // null until the saved choice is read after mount, so the adzan never
  // starts before an "off" is known.
  const [isOn, setIsOn] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setIsOn(localStorage.getItem("adzan") !== "off");
    } catch {
      setIsOn(true);
    }
  }, []);

  const toggle = (on: boolean) => {
    setIsOn(on);
    try {
      localStorage.setItem("adzan", on ? "on" : "off");
    } catch {
      // Blocked storage: the choice holds until the page closes.
    }
  };

  return (
    <div className="flex flex-col items-start gap-1.5 pt-1">
      <Toggle variant="outline" pressed={isOn !== false} onPressedChange={toggle}>
        {isOn === false ? (
          <BellOff aria-hidden="true" data-icon="inline-start" />
        ) : (
          <Bell aria-hidden="true" data-icon="inline-start" />
        )}
        Adzan otomatis
      </Toggle>
      <p className="text-sm text-muted-foreground">
        {isOn === false
          ? "Adzan tidak diputar saat masuk waktu sholat."
          : "Adzan berbunyi saat masuk waktu sholat, selama halaman ini terbuka."}
      </p>
      {isOn && waktu.length > 0 ? (
        <Suspense fallback={null}>
          <Adzan waktu={waktu} />
        </Suspense>
      ) : null}
    </div>
  );
}
