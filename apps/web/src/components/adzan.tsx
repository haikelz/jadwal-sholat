"use client";

import type { JadwalSholatProps } from "@/interfaces";
import useGlobalStore from "@/store";
import { add, format, parse } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useRef } from "react";
import { useAudioPlayer } from "react-use-audio-player";

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

export function Adzan({ waktu }: { waktu: JadwalSholatProps[] }) {
  const {
    date,
    setDate,
    setIsOpenConfirmModal,
    setIsPlayingAudioAdzan,
    isPlayingAudioAdzan,
    isOpenConfirmModal,
  } = useGlobalStore((state) => ({
    position: state.position,
    date: state.date,
    setDate: state.setDate,
    isOpenConfirmModal: state.isOpenConfirmModal,
    setIsOpenConfirmModal: state.setIsOpenConfirmModal,
    isPlayingAudioAdzan: state.isPlayingAudioAdzan,
    setIsPlayingAudioAdzan: state.setIsPlayingAudioAdzan,
  }));

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

  const { load, play, stop } = useAudioPlayer();

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

  // Open the prompt and load the adzan once per prayer per day. The audio
  // hook returns a new `stop` on every render, so this effect re-runs often;
  // the ref makes those runs no-ops. Without it, each run called load(), which
  // re-rendered and re-ran the effect: an endless update loop (React #185).
  const promptedRef = useRef<string | null>(null);
  useEffect(() => {
    if (!prayerName || isPlayingAudioAdzan) return;
    const key = `${dayKey}-${prayerName}`;
    if (promptedRef.current === key) return;
    promptedRef.current = key;

    setIsOpenConfirmModal(true);
    load(
      prayerName === "Subuh" ? "/audio/adzan-shubuh.mp3" : "/audio/adzan.mp3",
      {
        onend: () => {
          setIsPlayingAudioAdzan(false);
          stop();
        },
      },
    );
  }, [
    prayerName,
    dayKey,
    isPlayingAudioAdzan,
    setIsOpenConfirmModal,
    setIsPlayingAudioAdzan,
    load,
    stop,
  ]);

  // Opt-in reminder for a hidden tab: once per prayer time, only after the
  // reader granted permission from the homepage.
  const notifiedRef = useRef<string | null>(null);
  useEffect(() => {
    if (!prayerName || !("Notification" in window)) return;
    if (Notification.permission !== "granted") return;
    if (document.visibilityState !== "hidden") return;
    const key = `${dayKey}-${prayerName}`;
    if (notifiedRef.current === key) return;
    notifiedRef.current = key;

    const title = `Sudah masuk waktu ${prayerName}`;
    const options = {
      body: "Buka Jadwal Sholat untuk memutar adzan.",
      tag: key,
    };
    try {
      new Notification(title, options);
    } catch {
      // Android Chrome only allows notifications through the service worker.
      navigator.serviceWorker?.ready
        .then((registration) => registration.showNotification(title, options))
        .catch(() => undefined);
    }
  }, [prayerName, dayKey]);

  return (
    <Dialog open={isOpenConfirmModal} onOpenChange={setIsOpenConfirmModal}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sudah masuk waktu {prayerName}</DialogTitle>
          <DialogDescription>
            Apakah kamu ingin memutar suara adzan?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {!isPlayingAudioAdzan ? (
            <>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Tidak
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="button"
                  onClick={() => {
                    play();
                    setIsPlayingAudioAdzan(true);
                  }}
                >
                  Putar adzan
                </Button>
              </DialogClose>
            </>
          ) : (
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Tutup
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
