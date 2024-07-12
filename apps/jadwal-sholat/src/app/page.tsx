import { Metadata } from "next";
import TransitionLayout from "~components/transition-layout";
import { cn } from "~lib/utils/cn";
import { MetaUrl } from "~lib/utils/enums";

import JadwalSholatClient from "./client";

const baseMetadata = {
  title: "Jadwal Sholat",
  description: "Berikut daftar Kabupaten/Kota yang tersedia",
  url: `${MetaUrl.Site_Url}`,
};

const { title, description, url } = baseMetadata;

export const metadata: Metadata = {
  title,
  description,
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

export default function Homepage() {
  return (
    <TransitionLayout
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "flex w-full max-w-full",
        "flex-col items-center justify-start",
        "pt-8 pb-24 md:pb-8"
      )}
    >
      <JadwalSholatClient />
    </TransitionLayout>
  );
}
