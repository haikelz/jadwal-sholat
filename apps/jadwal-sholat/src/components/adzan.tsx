"use client";

import { JadwalSholatProps } from "@/interfaces";
import useGlobalStore from "@/store";
import { add, format, parse } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useRef } from "react";
import { useAudioPlayer } from "react-use-audio-player";
import { useDeepCompareEffect } from "use-deep-compare";

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

  // Match against the live clock so the row follows midnight.
  const filteredWaktu = waktu
    .filter((item) => item.date.gregorian.date === format(date, "dd-MM-yyyy"))
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

  const formattedTime: string = format(date, `kk.mm`, {
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

  useDeepCompareEffect(() => {
    // The month's data has no row for today right after the month rolls over.
    if (!filteredWaktu) return;
    if (
      formattedTime >= filteredWaktu.timings.Fajr &&
      formattedTime <= getAddTimeResult(filteredWaktu.timings.Fajr, 10) &&
      !isPlayingAudioAdzan
    ) {
      setIsOpenConfirmModal(true);

      load("/audio/adzan-shubuh.mp3", {
        onend: () => {
          setIsPlayingAudioAdzan(false);
          stop();
        },
      });
    } else if (
      ((formattedTime >= filteredWaktu.timings.Dhuhr &&
        formattedTime <= getAddTimeResult(filteredWaktu.timings.Dhuhr, 10)) ||
        (formattedTime >= filteredWaktu.timings.Asr &&
          formattedTime <= getAddTimeResult(filteredWaktu.timings.Asr, 10)) ||
        (formattedTime >= filteredWaktu.timings.Maghrib &&
          formattedTime <=
            getAddTimeResult(filteredWaktu.timings.Maghrib, 10)) ||
        (formattedTime >= filteredWaktu.timings.Isha &&
          formattedTime <= getAddTimeResult(filteredWaktu.timings.Isha, 10))) &&
      !isPlayingAudioAdzan
    ) {
      setIsOpenConfirmModal(true);

      load("/audio/adzan.mp3", {
        onend: () => {
          setIsPlayingAudioAdzan(false);
          stop();
        },
      });
    }
  }, [
    formattedTime,
    setIsOpenConfirmModal,
    load,
    stop,
    isPlayingAudioAdzan,
    setIsPlayingAudioAdzan,
    filteredWaktu,
  ]);

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

  // Opt-in reminder for a hidden tab: once per prayer time, only after the
  // reader granted permission from the homepage.
  const notifiedRef = useRef<string | null>(null);
  const dayKey = format(date, "yyyy-MM-dd");
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
