import { PageHeader, PageShell } from "@/components/common/page-shell";
import { HadithPage } from "@/components/hadith/hadith-page";
import { createPageMetadata } from "@/lib/utils/metadata";
import { Suspense } from "react";

export const metadata = createPageMetadata({
  title: "Hadith",
  description:
    "Baca kumpulan hadith Nabi Muhammad ﷺ berdasarkan kitab dan nomor.",
  path: "/hadith",
});

export default function Hadith() {
  return (
    <PageShell>
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
