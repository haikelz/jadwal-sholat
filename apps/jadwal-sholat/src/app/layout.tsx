import { Metadata, Viewport } from "next";
import { BackToTop } from "~components/atoms";
import { Navbar } from "~components/organisms";
import { ChildrenProps } from "~interfaces";
import { cx } from "~lib/helpers";
import { MetaUrl } from "~lib/utils/enums";
import { arab, bitter, ibmPlexSans } from "~lib/utils/fonts";

import "./globals.css";
import Wrapper from "./wrapper";

const baseMetadata = {
  title: "Jadwal Sholat",
  description: "🕌 Website Jadwal sholat, Asma'ul Husna, dan baca Al-Qur'an",
  url: MetaUrl.Site_Url,
};

const { title, description, url } = baseMetadata;

export const metadata: Metadata = {
  title,
  description,
  manifest: "/manifest.json",
  themeColor: "#FFFFFF",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    url,
    title,
    description,
    images: [
      {
        url: MetaUrl.Default_Og_Url,
        alt: "OG Image",
      },
    ],
    siteName: "info-jadwal-sholat.vercel.app",
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function Layout({ children }: ChildrenProps) {
  return (
    <html
      lang="en"
      className={cx(ibmPlexSans.variable, arab.variable, bitter.variable)}
      suppressHydrationWarning
    >
      <body className={cx(ibmPlexSans.className)}>
        <Wrapper>
          <div
            className={cx(
              "bg-gray-50 text-black",
              "md:flex",
              "dark:bg-gray-900 dark:text-white"
            )}
          >
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
