"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { LastReadProps } from "~interfaces";

interface ScrollAyatProps {
  lastRead: LastReadProps;
  ayat: string;
  isAudioEnded: boolean;
  setIsAudioEnded: Dispatch<SetStateAction<boolean>>;
}

export function useScrollAyat({ lastRead, ayat, isAudioEnded, setIsAudioEnded }: ScrollAyatProps) {
  useEffect(() => {
    const lastReadId = document.getElementById(`ayat-${lastRead.ayat?.toString()}`);
    const ayatId = document.getElementById(ayat);

    if (lastReadId && lastRead.number === Number(secureLocalStorage.getItem("selected-surat"))) {
      lastReadId.scrollIntoView({ behavior: "smooth" });
    }

    if (isAudioEnded) ayatId?.scrollIntoView({ behavior: "smooth" });
    setIsAudioEnded(false);
  }, [lastRead, isAudioEnded, setIsAudioEnded, ayat]);
}
