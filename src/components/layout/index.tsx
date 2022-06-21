import { childrenProps } from "src/types";
import { useEffect, useState } from "react";
import { LazyMotion, m, domAnimation } from "framer-motion";
import Head from "next/head";
import BottomNav from "./bottomNav";
import Loading from "../loading";

const Layout = ({ children, title }: childrenProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className="flex justify-center text-center items-center w-full px-4 md:px-8 pt-8 pb-28 flex-col">
        <main className="md:max-w-[85%] w-full flex justify-center gap-7 items-center flex-col">
          {!loading ? (
            <Loading />
          ) : (
            <LazyMotion features={domAnimation}>
              <m.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0 }}
              >
                {children}
              </m.div>
            </LazyMotion>
          )}
        </main>
        <BottomNav />
      </section>
    </>
  );
};

export default Layout;
