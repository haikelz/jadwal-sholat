import { CustomSidebar } from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { ChildrenProps } from "@/interfaces";
import { cn } from "@/lib/utils/cn";
import { MetaUrl } from "@/lib/utils/enums";
import { geistSans } from "@/lib/utils/fonts";
import { Metadata, Viewport } from "next";

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
    <html lang="en" className={cn(geistSans.variable)} suppressHydrationWarning>
      <body className={cn(geistSans.className)}>
        <Wrapper>
          <div
            className={cn(
              "bg-white text-black",
              "md:flex",
              "dark:bg-gray-950 dark:text-white"
            )}
          >
            <CustomSidebar>{children}</CustomSidebar>
          </div>
        </Wrapper>
        <Toaster />
      </body>
    </html>
  );
}
