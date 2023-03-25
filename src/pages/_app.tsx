import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "windi.css";
import { layoutAnimation } from "~lib/utils/constants";
import Navbar from "~organisms/Navbar";
import "~styles/index.scss";
import Template from "~templates/index";

const BackToTop = dynamic(() => import("~atoms").then((obj) => obj.BackToTop));

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <Template>
      <Navbar />
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          <m.main className="flex w-full justify-center" key={router.route} {...layoutAnimation}>
            <Component {...pageProps} />
            <BackToTop />
          </m.main>
        </AnimatePresence>
      </LazyMotion>
    </Template>
  );
};

export default App;
