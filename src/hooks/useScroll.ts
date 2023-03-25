import { useCallback, useEffect, useState } from "react";

export const useScroll = () => {
  const [scroll, setScroll] = useState<number>(0);

  // buat handle warning useEffect pas pengecekan
  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    setScroll(() => position);
  }, [setScroll]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return scroll;
};
