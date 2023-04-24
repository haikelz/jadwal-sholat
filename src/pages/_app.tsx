import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "windi.css";
import Template from "~components/Template";
import { layoutAnimation } from "~lib/utils/animations";
import Navbar from "~components/organisms/Navbar";
import "~styles/index.scss";

const BackToTop = dynamic(() => import("~components/atoms").then((button) => button.BackToTop));

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
