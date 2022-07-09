import { useAtom } from "jotai";
import { mountedAtom } from "src/store";
import { ThemeProvider } from "next-themes";
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

  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
