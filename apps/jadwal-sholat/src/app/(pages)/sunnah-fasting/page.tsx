import { PageHeader, PageShell } from "@/components/common/page-shell";
import { PuasaSunnahPage } from "@/components/puasa-sunnah/puasa-sunnah-page";
import { createPageMetadata } from "@/lib/utils/metadata";
import { Suspense } from "react";

export const metadata = createPageMetadata({
  title: "Puasa Sunnah",
  description:
    "Lihat jadwal puasa sunnah berdasarkan bulan, tahun, dan jenis puasa.",
  path: "/sunnah-fasting",
});

export default function PuasaSunnah() {
  return (
    <PageShell>
      <PageHeader
        title="Puasa Sunnah"
        description="Jadwal puasa sunnah per bulan dan jenis."
      />
      <Suspense>
        <PuasaSunnahPage />
      </Suspense>
    </PageShell>
  );
}
