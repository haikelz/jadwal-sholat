import Navbar from "@/organisms/navbar";
import { mountedAtom } from "@/store";
import { appAnimation } from "@/utils/animation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Provider, useAtom } from "jotai";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import "../styles/index.scss";

const BackToTop = dynamic(() => import("@/atoms/backToTop").then((item) => item.BackToTop));

const App = ({ Component, pageProps, router }: AppProps) => {
  const [mounted, setMounted] = useAtom(mountedAtom);
  const queryClient = new QueryClient();

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) {
    return null;
  }

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <div className="inset-0 bg-gray-50 dark:bg-gray-900 dark:text-white md:flex">
          <Navbar />
          <AnimatePresence mode="wait">
            <motion.main
              className="flex w-full justify-center"
              key={router.route}
              {...appAnimation}
            >
              <Component {...pageProps} />
              <BackToTop />
            </motion.main>
          </AnimatePresence>
        </div>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
