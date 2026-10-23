import { JsonLd } from "@/components/common/json-ld";
import { PageHeader, PageShell } from "@/components/common/page-shell";
import { AsmaulHusnaPage } from "@/components/asmaul-husna/asmaul-husna-page";
import { env } from "@/lib/utils/public-env";
import { AsmaulHusnaProps } from "@/interfaces";
import { getData } from "@/lib/utils/get-data";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/utils/metadata";
import { Suspense } from "react";

const { NEXT_PUBLIC_ASMAUL_HUSNA_API } = env;

export const metadata = createPageMetadata({
  title: "Asmaul Husna: 99 Nama Allah, Arab, Latin dan Artinya",
  description:
    "Daftar lengkap 99 Asmaul Husna dengan tulisan Arab, latin, dan artinya dalam bahasa Indonesia. Cari nama dan salin dengan satu ketukan.",
  path: "/asmaul-husna",
});

async function getAllAsmaulHusna(): Promise<AsmaulHusnaProps[]> {
  try {
    const response: { data: AsmaulHusnaProps[] } = await getData(
      `${NEXT_PUBLIC_ASMAUL_HUSNA_API}/api/all`,
    );
    return response.data as AsmaulHusnaProps[];
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export default async function AsmaulHusna() {
  const asmaulHusna: AsmaulHusnaProps[] = await getAllAsmaulHusna();

  return (
    <PageShell>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Asmaul Husna", path: "/asmaul-husna" }])}
      />
      <PageHeader
        title="Asma'ul Husna"
        description="Kenali 99 nama Allah beserta tulisan Arab dan artinya."
      />
      <Suspense>
        <AsmaulHusnaPage asmaulHusna={asmaulHusna} />
      </Suspense>
    </PageShell>
  );
}
