import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { Provider } from "jotai";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { appAnimation } from "~lib/utils/animation";
import Navbar from "~organisms/Navbar";
import "~styles/index.scss";
import Template from "~templates/index";

const BackToTop = dynamic(() => import("~atoms/BackToTop"));

const App = ({ Component, pageProps, router }: AppProps) => {
  const queryClient = new QueryClient();

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
