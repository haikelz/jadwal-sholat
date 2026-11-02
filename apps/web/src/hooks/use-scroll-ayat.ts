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
    // An explicit scrollIntoView ignores the CSS reduced-motion rule.
    const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    if (
      !hasAyatLink &&
      lastReadId &&
      lastRead.number === Number(localStorage.getItem("selected-surat"))
    ) {
      lastReadId.scrollIntoView({ behavior });
    }

    if (isAudioEnded) {
      ayatId?.scrollIntoView({ behavior });
    }

    setIsAudioEnded(false);
  }, [lastRead, isAudioEnded, setIsAudioEnded, ayat]);
}
