"use client";

import type { JadwalSholatProps } from "@/interfaces";
import useGlobalStore from "@/store";
import { add, format, parse } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useRef, useState } from "react";

import { formatSholatTime } from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zonedNow } from "@jadwal-sholat/core/dates";

/**
 * Plays the adzan at each prayer time on `audio`, which AdzanReminder
 * unlocked with the reader's first tap on the page.
 */
export function Adzan({
  waktu,
  audio,
}: {
  waktu: JadwalSholatProps[];
  audio: HTMLAudioElement;
}) {
  const { date, setDate } = useGlobalStore((state) => ({
    date: state.date,
    setDate: state.setDate,
  }));
  // The prayer stays set after closing, so the title holds during the fade.
  const [prayer, setPrayer] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  // The location's own clock, so a place picked in another timezone gets its
  // reminder on time. Matching against it also follows midnight.
  const timeZone = waktu[0]?.meta?.timezone;
  const clock = timeZone ? zonedNow(date, timeZone) : date;
  const filteredWaktu = waktu
    .filter((item) => item.date.gregorian.date === format(clock, "dd-MM-yyyy"))
    .map((item) => ({
      ...item,
      timings: {
        Asr: formatSholatTime(item.timings.Asr),
        Dhuhr: formatSholatTime(item.timings.Dhuhr),
        Fajr: formatSholatTime(item.timings.Fajr),
        Maghrib: formatSholatTime(item.timings.Maghrib),
        Isha: formatSholatTime(item.timings.Isha),
      },
    }))[0];

  const formattedTime: string = format(clock, `kk.mm`, {
    locale: id,
  });

  function getAddTimeResult(timeNow: string, subMinutes: number) {
    const parseTime = parse(timeNow, "HH.mm", new Date());
    const addTime = add(parseTime, { minutes: subMinutes });

    return format(addTime, "kk.mm", { locale: id });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(() => new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [setDate]);

  const prayerName = !filteredWaktu
    ? ""
    : formattedTime >= filteredWaktu.timings.Fajr &&
    formattedTime <= getAddTimeResult(filteredWaktu.timings.Fajr, 10)
      ? "Subuh"
      : formattedTime >= filteredWaktu.timings.Dhuhr &&
          formattedTime <= getAddTimeResult(filteredWaktu.timings.Dhuhr, 10)
        ? "Dzuhur"
        : formattedTime >= filteredWaktu.timings.Asr &&
            formattedTime <= getAddTimeResult(filteredWaktu.timings.Asr, 10)
          ? "Ashar"
          : formattedTime >= filteredWaktu.timings.Maghrib &&
              formattedTime <= getAddTimeResult(filteredWaktu.timings.Maghrib, 10)
            ? "Maghrib"
            : formattedTime >= filteredWaktu.timings.Isha &&
                formattedTime <= getAddTimeResult(filteredWaktu.timings.Isha, 10)
              ? "Isya"
              : "";

  const dayKey = format(clock, "yyyy-MM-dd");

  // A tap on the page since it loaded lets play() start. Without one it
  // rejects and the dialog offers a play button.
  const playAdzan = () => {
    setIsOpen(true);
    setIsBlocked(false);
    audio.play().catch(() => setIsBlocked(true));
  };

  const stopAdzan = () => {
    audio.pause();
    setIsOpen(false);
  };

  // Once per prayer per day. The ref keeps a re-render inside the 10-minute
  // window from starting it again.
  const playedRef = useRef<string | null>(null);
  useEffect(() => {
    if (!prayerName) return;
    const key = `${dayKey}-${prayerName}`;
    if (playedRef.current === key) return;
    playedRef.current = key;

    audio.src =
      prayerName === "Subuh" ? "/audio/adzan-shubuh.mp3" : "/audio/adzan.mp3";
    audio.onended = () => setIsOpen(false);
    setPrayer(prayerName);
    playAdzan();
  }, [prayerName, dayKey, audio]);

  // Switching the adzan off or leaving the homepage (ClientRouter keeps the
  // tab) stops it.
  useEffect(() => () => audio.pause(), [audio]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) stopAdzan();
      }}
    >
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sudah masuk waktu {prayer}</DialogTitle>
          <DialogDescription>
            {isBlocked
              ? "Browser belum mengizinkan suara otomatis. Ketuk Putar adzan untuk mendengarkan."
              : "Adzan sedang diputar."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {isBlocked ? (
            <>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Tutup
                </Button>
              </DialogClose>
              <Button type="button" onClick={playAdzan}>
                Putar adzan
              </Button>
            </>
          ) : (
            <DialogClose asChild>
              <Button type="button">Hentikan adzan</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
