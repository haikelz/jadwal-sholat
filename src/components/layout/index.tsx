import { ReactNode } from "react";
import Head from "next/head";
import BottomNav from "./bottomNav";

interface childrenProps {
  children: ReactNode[] | JSX.Element;
  title?: string;
}

const Layout = ({ children, title }: childrenProps) => {
  return (
    <>
      <Head>
        <title>Jadwal Sholat {title}</title>
      </Head>
      <section className="flex justify-center text-center items-center max-w-full px-2 md:px-8 pt-8 pb-28 flex-col">
        <main className="max-w-[85%] flex justify-center gap-7 items-center flex-col">
          {children}
        </main>
        <BottomNav />
      </section>
    </>
  );
};

export default Layout;
