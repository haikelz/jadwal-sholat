import { cx } from "classix";
import { BackToTop } from "~components/atoms";
import { Navbar } from "~components/organisms";
import { ChildrenProps } from "~interfaces";
import { arab, bitter, ibmPlexSans } from "~lib/utils/fonts";

import "./globals.css";
import Wrapper from "./wrapper";

export default function Layout({ children }: ChildrenProps) {
  return (
    <html lang="en" className={cx(ibmPlexSans.variable, arab.variable, bitter.variable)}>
      <body className={cx(ibmPlexSans.className)}>
        <Wrapper>
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
        </Wrapper>
      </body>
    </html>
  );
}
