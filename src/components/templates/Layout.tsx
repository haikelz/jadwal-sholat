import { ChildrenProps } from "~types";
import Head from "next/head";
import { clsx } from "clsx";

const Layout = ({ children, title }: ChildrenProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section
        className={clsx(
          "flex min-h-screen w-full max-w-full flex-col items-center",
          "bg-gray-50 px-5 pt-8 pb-24 text-center",
          "md:px-8",
          "dark:bg-gray-900"
        )}
      >
        <div className="flex w-full max-w-full flex-col items-center justify-center space-y-7">
          {children}
        </div>
      </section>
    </>
  );
};

export default Layout;
