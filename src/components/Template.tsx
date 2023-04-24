import { cx } from "classix";
import NextNProgress from "nextjs-progressbar";
import { bitter, rubik } from "~lib/utils/fonts";
import { ChildrenProps } from "~models";

export default function Template({ children }: ChildrenProps) {
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
        {children}
      </div>
    </>
  );
}
