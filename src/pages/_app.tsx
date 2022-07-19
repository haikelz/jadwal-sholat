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

  return (
    <div className="dark:bg-gray-900 min-h-screen dark:text-white">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
