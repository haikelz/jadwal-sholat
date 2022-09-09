import { Provider, useAtom } from "jotai";
import { mountedAtom } from "@/store/index";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { appAnimation } from "@/utils/animation";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import BottomNav from "@/components/organisms/bottomNav";
import BackToTop from "@/components/atoms/backToTop";

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const [mounted, setMounted] = useAtom(mountedAtom);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) {
    return null;
  }

  return (
    <Provider>
      <div className="dark:bg-gray-900 min-h-screen dark:text-white">
        <AnimatePresence exitBeforeEnter>
          <motion.div key={router.route} {...appAnimation}>
            <Component {...pageProps} />
            <BackToTop />
          </motion.div>
        </AnimatePresence>
        <BottomNav />
      </div>
    </Provider>
  );
};

export default MyApp;
