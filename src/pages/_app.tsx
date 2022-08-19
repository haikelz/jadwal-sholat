import { useAtom } from "jotai";
import { mountedAtom } from "src/store";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { appAnimation } from "src/utils/animation";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import BottomNav from "src/components/layout/bottomNav";
import BackToTop from "src/components/button/backToTop";

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const [mounted, setMounted] = useAtom(mountedAtom);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="dark:bg-gray-900 min-h-screen dark:text-white">
      <AnimatePresence exitBeforeEnter>
        <motion.div key={router.route} {...appAnimation}>
          <Component {...pageProps} />
          <BackToTop />
        </motion.div>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
};

export default MyApp;
