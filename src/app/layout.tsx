import { cx } from "classix";
import NextTopLoader from "nextjs-toploader";
import "windi.css";
import { arab, bitter, rubik } from "~lib/utils/fonts";
import { ChildrenProps } from "~models";

import { BackToTop } from "../components/atoms";
import { Navbar } from "../components/organisms";
import "./globals.css";

export default function Layout({ children }: ChildrenProps) {
  return (
    <html
      lang="eng"
      className={cx(rubik.variable, arab.variable, bitter.variable)}
      suppressHydrationWarning
    >
      <body className={cx(rubik.className)}>
        <NextTopLoader color="#3B82f6" showSpinner={false} />
        <div className={cx("bg-gray-50", "md:flex", "dark:bg-gray-900 dark:text-white")}>
          <Navbar />
          <main className="flex w-full justify-center">
            <section
              className={cx(
                "flex w-full max-w-full flex-col items-center min-h-screen",
                "bg-gray-50 px-5 text-center",
                "dark:bg-gray-900"
              )}
            >
              {children}
            </section>
            <BackToTop />
          </main>
        </div>
      </body>
    </html>
  );
}
