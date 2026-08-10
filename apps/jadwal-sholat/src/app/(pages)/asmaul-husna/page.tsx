import { PageHeader, PageShell } from "@/components/common/page-shell";
import { AsmaulHusnaPage } from "@/components/asmaul-husna/asmaul-husna-page";
import { env } from "@/env.mjs";
import { AsmaulHusnaProps } from "@/interfaces";
import { getData } from "@/lib/utils/axios-config";
import { createPageMetadata } from "@/lib/utils/metadata";
import { Suspense } from "react";

const { NEXT_PUBLIC_ASMAUL_HUSNA_API } = env;

export const metadata = createPageMetadata({
  title: "Asmaul Husna",
  description: "Baca 99 nama Allah beserta tulisan Arab dan artinya.",
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
