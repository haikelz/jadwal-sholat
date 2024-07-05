import { Metadata, Viewport } from "next";
import BackToTop from "~components/back-to-top";
import Navbar from "~components/navbar";
import { ChildrenProps } from "~interfaces";
import { cn } from "~lib/utils/cn";
import { MetaUrl } from "~lib/utils/enums";
import { bitter, ibmPlexSans } from "~lib/utils/fonts";

import "./globals.css";
import Wrapper from "./wrapper";

const baseMetadata = {
  title: "Jadwal Sholat",
  description: "🕌 Website Jadwal sholat, Asma'ul Husna, dan baca Al-Qur'an",
  url: MetaUrl.Site_Url,
};

const { title, description, url } = baseMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title,
  description,
  manifest: "/manifest.json",
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
    siteName: "jdwshlt.ekel.dev",
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

export default function Layout({ children }: ChildrenProps) {
  return (
    <html
      lang="en"
      className={cn(ibmPlexSans.variable, bitter.variable)}
      suppressHydrationWarning
    >
      <body className={cn(ibmPlexSans.className)}>
        <Wrapper>
          <div
            className={cn(
              "bg-white text-black",
              "md:flex",
              "dark:bg-gray-950 dark:text-white"
            )}
          >
            <Navbar />
            <main className="flex w-full justify-center">
              <section
                className={cn(
                  "flex w-full max-w-full flex-col items-center min-h-screen",
                  "bg-white px-5 text-center",
                  "dark:bg-gray-950"
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
