import { useAtom } from "jotai";
import { mountedAtom } from "src/store";

import { useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useAtom(mountedAtom);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
