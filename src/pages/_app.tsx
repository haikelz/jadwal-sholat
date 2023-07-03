import { cx } from "classix";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import NextTopLoader from "nextjs-toploader";
import "windi.css";
import { Navbar } from "~components/organisms";
import { layoutAnimation } from "~lib/utils/animations";
import { bitter, rubik } from "~lib/utils/fonts";
import "~styles/index.css";

const BackToTop = dynamic(() => import("~components/atoms").then((button) => button.BackToTop));

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <NextTopLoader color="#3B82f6" showSpinner={false} />
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
