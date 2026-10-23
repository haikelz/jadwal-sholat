import { JsonLd } from "@/components/common/json-ld";
import { PageHeader, PageShell } from "@/components/common/page-shell";
import { PuasaSunnahPage } from "@/components/puasa-sunnah/puasa-sunnah-page";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/utils/metadata";
import { Suspense } from "react";

export const metadata = createPageMetadata({
  title: "Jadwal Puasa Sunnah Bulan Ini",
  description:
    "Jadwal puasa sunnah tiap bulan: Senin Kamis, Ayyamul Bidh, Arafah, Asyura, puasa Syawal, dan awal Zulhijah, lengkap dengan tanggal Hijriah.",
  path: "/sunnah-fasting",
});

export default function PuasaSunnah() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Puasa Sunnah", path: "/sunnah-fasting" }])}
      />
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
