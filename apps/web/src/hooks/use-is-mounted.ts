import { useEffect, useState } from "react";

/** False in the build-time render and the first client render. */
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  return isMounted;
}
