"use client";

import { useEffect } from "react";
import { LastReadProps } from "~interfaces";

interface ScrollAyatProps {
  lastRead: LastReadProps;
  ayat: string;
  isAudioEnded: boolean;
  setIsAudioEnded: (isAudioEnded: boolean) => void;
}

/**
 * A custom hook for manage scroll to ayat feature
 * @param {ScrollAyatProps} scrollAyat - scrollAyat object
 */
export function useScrollAyat({
  lastRead,
  ayat,
  isAudioEnded,
  setIsAudioEnded,
}: ScrollAyatProps) {
  useEffect(() => {
    const lastReadId = document.getElementById(
      `ayat-${lastRead.ayat?.toString()}`
    );
    const ayatId = document.getElementById(ayat);

    if (
      lastReadId &&
      lastRead.number === Number(localStorage.getItem("selected-surat"))
    ) {
      lastReadId.scrollIntoView({ behavior: "smooth" });
    }

    if (isAudioEnded) ayatId?.scrollIntoView({ behavior: "smooth" });
    setIsAudioEnded(false);
  }, [lastRead, isAudioEnded, setIsAudioEnded, ayat]);
}
