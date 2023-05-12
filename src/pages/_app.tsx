import { cx } from "classix";
import { AnimatePresence, domAnimation, LazyMotion, m, Variants } from "framer-motion";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import NextNProgress from "nextjs-progressbar";
import "windi.css";
import Navbar from "~components/organisms/Navbar";
import { bitter, rubik } from "~lib/utils/fonts";
import "~styles/index.scss";

export const layoutAnimation: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: 30, opacity: 0 },
};

const BackToTop = dynamic(() => import("~components/atoms").then((button) => button.BackToTop));

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <NextNProgress color="#3B82f6" options={{ showSpinner: false }} />
      <style global jsx>
        {`
          h1 {
            font-family: ${bitter.style.fontFamily};
          }
        `}
      </style>
      <div
        className={cx("bg-gray-50", "md:flex", "dark:bg-gray-900 dark:text-white", rubik.className)}
      >
        <Navbar />
        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="wait">
            <m.main
              className="flex w-full justify-center"
              key={router.route}
              transition={{ duration: 0.3 }}
              variants={layoutAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Component {...pageProps} />
              <BackToTop />
            </m.main>
          </AnimatePresence>
        </LazyMotion>
      </div>
    </>
  );
}
