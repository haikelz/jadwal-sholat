import { HadithPage } from "@/components/hadith/hadith-page";
import { TransitionLayout } from "@/components/transition-layout";
import { cn } from "@/lib/utils/cn";
import { MetaUrl } from "@/lib/utils/enums";
import { Suspense } from "react";

const baseMetadata = {
  title: "Hadith | Jadwal Sholat",
  description: "Kumpulan hadith Nabi Muhammad ﷺ",
  url: `${MetaUrl.Site_Url}/hadith`,
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
    siteName: "jdwshlt.ekel.dev/hadith",
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

export default function Hadith() {
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
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className={cn("text-3xl font-bold tracking-wide sm:text-4xl")}>
            Hadith
          </h1>
        </div>
        <p data-cy="description" className="mt-2 my-7 text-lg font-medium">
          Kumpulan hadith Nabi Muhammad ﷺ
        </p>
      </div>
      <Suspense>
        <HadithPage />
      </Suspense>
    </TransitionLayout>
  );
}
