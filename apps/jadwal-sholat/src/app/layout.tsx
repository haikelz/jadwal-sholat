import { AppShell } from "@/components/common/app-shell";
import { JsonLd } from "@/components/common/json-ld";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChildrenProps } from "@/interfaces";
import { cn } from "@/lib/utils/cn";
import { DISPLAY_SETTINGS_SCRIPT } from "@/lib/utils/display-settings";
import { geistMono, geistSans, lpmqIsepMisbah } from "@/lib/utils/fonts";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  WEBSITE_JSON_LD,
} from "@/lib/utils/metadata";
import { Analytics } from "@vercel/analytics/next";
import { Metadata, Viewport } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import Wrapper from "./wrapper";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Haikel Ilham Hakim" }],
  creator: "Haikel Ilham Hakim",
  keywords: [
    "jadwal sholat",
    "waktu sholat",
    "Al-Qur'an",
    "hadith",
    "Asmaul Husna",
    "puasa sunnah",
  ],
  alternates: { canonical: "/" },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    locale: "id_ID",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Jadwal Sholat — waktu ibadah dan bacaan Islami",
      },
    ],
    siteName: SITE_NAME,
  },
  twitter: {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function Layout({ children }: ChildrenProps) {
  return (
    <html
      lang="id"
      className={cn(
        geistSans.variable,
        geistMono.variable,
        lpmqIsepMisbah.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        {/* Applies the reader's saved text sizes before the first paint. */}
        <script dangerouslySetInnerHTML={{ __html: DISPLAY_SETTINGS_SCRIPT }} />
        <JsonLd data={WEBSITE_JSON_LD} />
      </head>
      <body className={geistSans.className}>
        <NuqsAdapter>
          <Wrapper>
            <TooltipProvider>
              <AppShell>{children}</AppShell>
            </TooltipProvider>
            {/* Keep toasts above the mobile bottom navigation. */}
            {/* 6 s instead of 4, so slower readers can finish a toast. */}
            <Toaster
              duration={6000}
              mobileOffset={{
                bottom: "calc(4.5rem + env(safe-area-inset-bottom))",
              }}
            />
          </Wrapper>
        </NuqsAdapter>
        <Analytics />
      </body>
    </html>
  );
}
