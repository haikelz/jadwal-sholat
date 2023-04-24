import { useCallback, useEffect, useState } from "react";

export function useScroll() {
  const [scroll, setScroll] = useState<number>(0);

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    setScroll(() => position);
  }, [setScroll]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return scroll;
}
