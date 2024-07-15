"use client";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect } from "react";
import { useAudioPlayer } from "react-use-audio-player";
import { useDeepCompareEffect } from "use-deep-compare";
import { JadwalSholatProps } from "~interfaces";
import { cn } from "~lib/utils/cn";
import { matchDate } from "~lib/utils/constants";
import useGlobalStore from "~store";

import { Button } from "./ui/button";

export default function Adzan({ waktu }: { waktu: JadwalSholatProps[] }) {
  const filteredWaktu = waktu
    .filter((item) => item.date.gregorian.date === matchDate)
    .map((item) => ({
      ...item,
      timings: {
        Asr: item.timings.Asr.slice(0, 5),
        Dhuhr: item.timings.Dhuhr.slice(0, 5),
        Fajr: item.timings.Fajr.slice(0, 5),
        Maghrib: item.timings.Maghrib.slice(0, 5),
        Isha: item.timings.Isha.slice(0, 5),
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

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(() => new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [setDate]);

  useDeepCompareEffect(() => {
    if (
      formattedTime >= filteredWaktu.timings.Fajr &&
      formattedTime <= filteredWaktu.timings.Fajr + "00.05"
    ) {
      setIsOpenConfirmModal(true);

      load("/audio/adzan-shubuh.mp3", {
        onend: () => {
          setIsPlayingAudioAdzan(false);
          stop();
        },
      });
    } else if (
      (formattedTime >= filteredWaktu.timings.Dhuhr &&
        formattedTime <= filteredWaktu.timings.Dhuhr + "00.10") ||
      (formattedTime >= filteredWaktu.timings.Asr &&
        formattedTime <= filteredWaktu.timings.Asr + "00.10") ||
      (formattedTime >= filteredWaktu.timings.Maghrib &&
        formattedTime <= filteredWaktu.timings.Maghrib + "00.10") ||
      (formattedTime >= filteredWaktu.timings.Isha &&
        formattedTime <= filteredWaktu.timings.Isha + "00.10")
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
    setIsPlayingAudioAdzan,
    filteredWaktu,
  ]);

  return (
    <>
      {isOpenConfirmModal ? (
        <div
          aria-modal="true"
          className={cn(
            "modal-blur fixed inset-0 top-0 z-50",
            "flex min-h-screen w-full items-center justify-center",
            "overflow-y-auto overflow-x-hidden"
          )}
        >
          <div className="relative md:h-auto">
            <div
              className={cn(
                "relative rounded-lg bg-white p-4",
                "dark:bg-gray-950 border border-input dark:text-white"
              )}
            >
              <div className="flex flex-col items-center justify-between rounded-t p-4">
                <h1 className="text-2xl font-bold">
                  Sudah Masuk Waktu{" "}
                  {formattedTime >= filteredWaktu.timings.Fajr &&
                  formattedTime <= filteredWaktu.timings.Fajr + "00.05"
                    ? "Subuh"
                    : formattedTime >= filteredWaktu.timings.Dhuhr &&
                      formattedTime <= filteredWaktu.timings.Dhuhr + "00.05"
                    ? "Dzuhur"
                    : formattedTime >= filteredWaktu.timings.Asr &&
                      formattedTime <= filteredWaktu.timings.Asr + "00.05"
                    ? "Ashar"
                    : formattedTime >= filteredWaktu.timings.Maghrib &&
                      formattedTime <= filteredWaktu.timings.Maghrib + "00.05"
                    ? "Maghrib"
                    : formattedTime >= filteredWaktu.timings.Isha &&
                      formattedTime <= filteredWaktu.timings.Isha + "00.05"
                    ? "Isya"
                    : formattedTime >= "23.47" &&
                      formattedTime <= "23.47" + "00.05"
                    ? "Shubuh"
                    : ""}
                </h1>
                {!isPlayingAudioAdzan ? (
                  <div className="mt-2">
                    <p>Apakah kamu ingin memutar suara Adzan?</p>
                    <div className="mt-4 space-x-3 flex justify-center items-center">
                      <Button
                        type="button"
                        aria-label="no"
                        variant="destructive"
                        onClick={() => setIsOpenConfirmModal(false)}
                        className="font-bold"
                      >
                        No
                      </Button>
                      <Button
                        type="button"
                        aria-label="yes"
                        onClick={() => {
                          play();
                          setIsOpenConfirmModal(false);
                          setIsPlayingAudioAdzan(true);
                        }}
                        className="font-bold"
                      >
                        Yes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    type="button"
                    aria-label="close"
                    onClick={() => setIsOpenConfirmModal(false)}
                    className="font-bold mt-2"
                  >
                    Close
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
