import { useAtom } from "jotai";
import { mountedAtom } from "src/store";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import BottomNav from "src/components/layout/bottomNav";

function MyApp({ Component, pageProps, router }: AppProps) {
  const [mounted, setMounted] = useAtom(mountedAtom);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={router.route}
          className="min-h-screen"
          transition={{ duration: 0.5 }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}

export default MyApp;
