import { childrenProps } from "src/props";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import BottomNav from "./bottomNav";

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
      <section className="flex justify-center text-center items-center w-full px-4 md:px-8 pt-8 pb-24 flex-col">
        <motion.main
          className="md:max-w-[85%] w-full flex justify-center gap-7 items-center flex-col"
          transition={{ duration: 0.5 }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {children}
        </motion.main>
        <BottomNav />
      </section>
    </>
  );
};

export default Layout;
