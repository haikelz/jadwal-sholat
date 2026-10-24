import type { LastReadProps } from "@/interfaces";
import { useEffect } from "react";

interface ScrollAyatProps {
  lastRead: LastReadProps;
  ayat: string;
  isAudioEnded: boolean;
  setIsAudioEnded: (isAudioEnded: boolean) => void;
}

/**
 * A custom hook for manage scroll to ayat feature
 * @export
 * @param {ScrollAyatProps} param0
 * @param {LastReadProps} param0.lastRead
 * @param {string} param0.ayat
 * @param {boolean} param0.isAudioEnded
 * @param {(isAudioEnded: boolean) => void} param0.setIsAudioEnded
 */
export function useScrollAyat({
  lastRead,
  ayat,
  isAudioEnded,
  setIsAudioEnded,
}: ScrollAyatProps) {
  useEffect(() => {
    const ayatId = document.getElementById(ayat);
    const lastReadId = document.getElementById(
      `ayat-${lastRead.ayat?.toString() as string}`,
    );

    // A shared link to one ayah (#ayat-N) wins over the last-read position.
    const hasAyatLink = window.location.hash.startsWith("#ayat-");

    if (
      !hasAyatLink &&
      lastReadId &&
      lastRead.number === Number(localStorage.getItem("selected-surat"))
    ) {
      lastReadId.scrollIntoView({ behavior: "smooth" });
    }

    if (isAudioEnded) {
      ayatId?.scrollIntoView({ behavior: "smooth" });
    }

    setIsAudioEnded(false);
  }, [lastRead, isAudioEnded, setIsAudioEnded, ayat]);
}
