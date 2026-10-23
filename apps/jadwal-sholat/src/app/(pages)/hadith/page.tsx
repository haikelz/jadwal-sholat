import { JsonLd } from "@/components/common/json-ld";
import { PageHeader, PageShell } from "@/components/common/page-shell";
import { HadithPage } from "@/components/hadith/hadith-page";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/utils/metadata";
import { Suspense } from "react";

export const metadata = createPageMetadata({
  title: "Kumpulan Hadith: Bukhari, Muslim dan Kitab Lainnya",
  description:
    "Baca 38.000+ hadith dari kitab Bukhari, Muslim, Abu Daud, Tirmidzi, Nasa'i, Ibnu Majah, Ahmad, Darimi, dan Malik, dengan teks Arab dan terjemahan.",
  path: "/hadith",
});

export default function Hadith() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbJsonLd([{ name: "Hadith", path: "/hadith" }])} />
      <PageHeader
        title="Hadith"
        description="Kumpulan hadith Nabi Muhammad ﷺ berdasarkan kitab dan nomor."
      />
      <Suspense>
        <HadithPage />
      </Suspense>
    </PageShell>
  );
}
