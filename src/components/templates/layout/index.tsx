import { Children } from "@/src/interfaces";
import Head from "next/head";

const Layout = ({ children, title }: Children) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className="flex justify-center text-center items-center max-w-full w-full px-5 md:px-8 pt-8 pb-24 flex-col bg-gray-50 dark:bg-gray-900">
        <div className="max-w-full w-full flex justify-center gap-7 items-center flex-col">
          {children}
        </div>
      </section>
    </>
  );
};

export default Layout;
