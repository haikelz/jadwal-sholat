import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "windi.css";
import { layoutAnimation } from "~lib/utils/animations";
import Navbar from "~organisms/Navbar";
import "~styles/index.scss";
import Template from "~templates/index";

const BackToTop = dynamic(() => import("~atoms").then((button) => button.BackToTop));

export default function App({ Component, pageProps, router }: AppProps) {
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
}
