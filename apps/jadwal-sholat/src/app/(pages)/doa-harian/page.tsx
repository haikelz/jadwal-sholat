import { PageHeader, PageShell } from "@/components/common/page-shell";
import { DoaHarianPage } from "@/components/doa-harian/doa-harian-page";
import { env } from "@/env.mjs";
import { DoaHarianProps } from "@/interfaces";
import { getData } from "@/lib/utils/axios-config";
import { createPageMetadata } from "@/lib/utils/metadata";
import Image from "next/image";
import { Suspense } from "react";

const { NEXT_PUBLIC_DOA_HARIAN_API } = env;

export const metadata = createPageMetadata({
  title: "Doa Harian",
  description: "Baca kumpulan doa harian lengkap dengan tulisan Arab dan arti.",
  path: "/doa-harian",
});

async function getDoaHarian(): Promise<DoaHarianProps[]> {
  try {
    const response: DoaHarianProps[] = await getData(
      NEXT_PUBLIC_DOA_HARIAN_API,
    );

    return response;
  } catch (err: any) {
    throw new Error("Failed to fetch data!");
  }
}

export default async function DoaHarian() {
  const doaHarian = await getDoaHarian();

  return (
    <PageShell>
      <PageHeader
        title="Doa Harian"
        description="Kumpulan doa harian dengan tulisan Arab, latin, dan terjemahan."
        icon={
          <Image
            src="/img/pray.svg"
            width={30}
            height={30}
            alt=""
            fetchPriority="high"
            draggable={false}
          />
        }
      />
      <Suspense>
        <DoaHarianPage doaHarian={doaHarian} />
      </Suspense>
    </PageShell>
  );
}
