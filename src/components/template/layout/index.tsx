import { Children } from "@/src/interfaces";
import Head from "next/head";

const Layout = ({ children, title }: Children) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className="flex justify-center text-center items-center w-full px-5 md:px-8 pt-8 pb-24 flex-col">
        <main className="md:max-w-[85%] w-full flex justify-center gap-7 items-center flex-col">
          {children}
        </main>
      </section>
    </>
  );
};

export default Layout;
