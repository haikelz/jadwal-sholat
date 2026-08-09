"use client";

import { JadwalSholatProps } from "@/interfaces";
import { matchDate } from "@/lib/utils/constants";
import useGlobalStore from "@/store";
import { add, format, parse } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect } from "react";
import { useAudioPlayer } from "react-use-audio-player";
import { useDeepCompareEffect } from "use-deep-compare";

import { formatSholatTime } from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Adzan({ waktu }: { waktu: JadwalSholatProps[] }) {
  const filteredWaktu = waktu
    .filter((item) => item.date.gregorian.date === matchDate)
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

  const prayerName =
    formattedTime >= filteredWaktu.timings.Fajr &&
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

  return (
    <Dialog open={isOpenConfirmModal} onOpenChange={setIsOpenConfirmModal}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <DialogTitle className="text-2xl leading-tight">
            Sudah masuk waktu {prayerName}
          </DialogTitle>
          <DialogDescription>
            Apakah kamu ingin memutar suara adzan?
          </DialogDescription>
        </DialogHeader>
        {!isPlayingAudioAdzan ? (
          <div className="text-center">
            <div className="mt-4 flex items-center justify-center gap-3">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="destructive"
                  className="font-bold"
                >
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
                  className="font-bold"
                >
                  Putar adzan
                </Button>
              </DialogClose>
            </div>
          </div>
        ) : (
          <DialogClose asChild>
            <Button type="button" className="mx-auto font-bold">
              Tutup
            </Button>
          </DialogClose>
        )}
      </DialogContent>
    </Dialog>
  );
}
