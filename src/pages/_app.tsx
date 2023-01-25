import { appAnimation } from "@/lib/utils/animation";
import Navbar from "@/organisms/navbar";
import { mountedAtom } from "@/store";
import Template from "@/templates/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { Provider, useAtom } from "jotai";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import "@/styles/index.scss";

const BackToTop = dynamic(() => import("@/atoms/backToTop"));

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
        <Template>
          <Navbar />
          <LazyMotion features={domAnimation}>
            <AnimatePresence mode="wait">
              <m.main className="flex w-full justify-center" key={router.route} {...appAnimation}>
                <Component {...pageProps} />
                <BackToTop />
              </m.main>
            </AnimatePresence>
          </LazyMotion>
        </Template>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
