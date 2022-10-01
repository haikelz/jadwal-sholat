import { Provider, useAtom } from "jotai";
import { mountedAtom } from "@/src/store";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { appAnimation } from "@/src/utils/animation";
import "../styles/index.scss";
import type { AppProps } from "next/app";
import BottomNav from "@/src/components/organisms/navbar";
import BackToTop from "@/src/components/atoms/backToTop";

const App = ({ Component, pageProps, router }: AppProps) => {
  const [mounted, setMounted] = useAtom(mountedAtom);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) {
    return null;
  }

  return (
    <Provider>
      <div className="bg-gray-50 dark:bg-gray-900 inset-0 md:flex dark:text-white min-h-screen">
        <BottomNav />
        <AnimatePresence exitBeforeEnter>
          <motion.div
            className="flex w-full justify-center items-center"
            key={router.route}
            {...appAnimation}
          >
            <Component {...pageProps} />
            <BackToTop />
          </motion.div>
        </AnimatePresence>
      </div>
    </Provider>
  );
};

export default App;
