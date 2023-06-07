import { cx } from "classix";
import Head from "next/head";
import { ChildrenProps } from "~models";

export default function Layout({ children, title }: ChildrenProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section
        className={cx(
          "flex w-full max-w-full flex-col items-center",
          "bg-gray-50 px-5 text-center",
          "dark:bg-gray-900"
        )}
      >
        <div
          className={cx(
            "flex min-h-screen w-full max-w-full",
            "flex-col items-center justify-center",
            "space-y-7 pt-8 pb-24 md:pb-8"
          )}
        >
          {children}
        </div>
      </section>
    </>
  );
}
