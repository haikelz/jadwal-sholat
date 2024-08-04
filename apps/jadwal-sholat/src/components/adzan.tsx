"use client";

import { add, format, parse } from "date-fns";
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
        Asr: item.timings.Asr.slice(0, 5).replace(":", "."),
        Dhuhr: item.timings.Dhuhr.slice(0, 5).replace(":", "."),
        Fajr: item.timings.Fajr.slice(0, 5).replace(":", "."),
        Maghrib: item.timings.Maghrib.slice(0, 5).replace(":", "."),
        Isha: item.timings.Isha.slice(0, 5).replace(":", "."),
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
                  formattedTime <=
                    getAddTimeResult(filteredWaktu.timings.Fajr, 10)
                    ? "Subuh"
                    : formattedTime >= filteredWaktu.timings.Dhuhr &&
                      formattedTime <=
                        getAddTimeResult(filteredWaktu.timings.Dhuhr, 10)
                    ? "Dzuhur"
                    : formattedTime >= filteredWaktu.timings.Asr &&
                      formattedTime <=
                        getAddTimeResult(filteredWaktu.timings.Asr, 10)
                    ? "Ashar"
                    : formattedTime >= filteredWaktu.timings.Maghrib &&
                      formattedTime <=
                        getAddTimeResult(filteredWaktu.timings.Maghrib, 10)
                    ? "Maghrib"
                    : formattedTime >= filteredWaktu.timings.Isha &&
                      formattedTime <=
                        getAddTimeResult(filteredWaktu.timings.Isha, 10)
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
