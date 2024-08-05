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
 * @export
 * @param {ScrollAyatProps} param0
 * @param {LastReadProps} param0.lastRead
 * @param {string} param0.ayat
 * @param {boolean} param0.isAudioEnded
 * @param {(isAudioEnded: boolean) => void} param0.setIsAudioEnded
 */
export function useScrollAyat(
  { lastRead, ayat, isAudioEnded, setIsAudioEnded }: ScrollAyatProps
) {
  useEffect(() => {
    const ayatId = document.getElementById(ayat);
    const lastReadId = document.getElementById(
      `ayat-${lastRead.ayat?.toString() as string}`
    );

    if (
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
