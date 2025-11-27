import { PuasaSunnahPage } from "@/components/puasa-sunnah/puasa-sunnah-page";
import { TransitionLayout } from "@/components/transition-layout";
import { cn } from "@/lib/utils/cn";
import { MetaUrl } from "@/lib/utils/enums";
import { Suspense } from "react";

const baseMetadata = {
  title: "Puasa Sunnah | Jadwal Sholat",
  description: "Berikut daftar Puasa Sunnah",
  url: `${MetaUrl.Site_Url}/puasa-sunnah`,
};

const { title, description, url } = baseMetadata;

export const metadata = {
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
    siteName: "jdwshlt.ekel.dev/puasa-sunnah",
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

export default function PuasaSunnah() {
  return (
    <TransitionLayout
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "flex w-full max-w-full",
        "flex-col items-center justify-start",
        "space-y-7 pt-8 pb-24 md:pb-8"
      )}
    >
      <div className="flex mb-4 flex-col items-center justify-center">
        <h1 className={cn("text-3xl font-bold tracking-wide sm:text-4xl")}>
          Puasa Sunnah
        </h1>
        <p className="mt-2 text-lg font-medium text-center">
          Berikut Jadwal Puasa Sunnah berdasarkan bulan dan jenis puasa yang
          dipilih
        </p>
      </div>
      <Suspense>
        <PuasaSunnahPage />
      </Suspense>
    </TransitionLayout>
  );
}
