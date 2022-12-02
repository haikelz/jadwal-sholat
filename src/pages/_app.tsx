import { Provider, useAtom } from "jotai";
import { mountedAtom } from "@/store";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { appAnimation } from "@/utils/animation";
import { BackToTop } from "@/components/atoms/backToTop";
import "../styles/index.scss";
import type { AppProps } from "next/app";
import BottomNav from "@/components/organisms/navbar";

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
      <div className="inset-0 bg-gray-50 dark:bg-gray-900 dark:text-white md:flex">
        <BottomNav />
        <AnimatePresence mode="wait">
          <motion.main className="flex w-full justify-center" key={router.route} {...appAnimation}>
            <Component {...pageProps} />
            <BackToTop />
          </motion.main>
        </AnimatePresence>
      </div>
    </Provider>
  );
};

export default App;
