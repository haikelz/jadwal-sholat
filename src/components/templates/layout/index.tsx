import { ChildrenProps } from "@/types";
import Head from "next/head";
import { twJoin } from "tailwind-merge";

const Layout = ({ children, title }: ChildrenProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section
        className={twJoin(
          "flex min-h-screen w-full max-w-full flex-col items-center",
          "bg-gray-50 px-5 pt-8 pb-24 text-center dark:bg-gray-900 md:px-8"
        )}
      >
        <div className="flex w-full max-w-full flex-col items-center justify-center gap-7">
          {children}
        </div>
      </section>
    </>
  );
};

export default Layout;
