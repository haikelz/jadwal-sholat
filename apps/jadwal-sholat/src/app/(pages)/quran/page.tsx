import { PageHeader, PageShell } from "@/components/common/page-shell";
import { QuranPage } from "@/components/quran/quran-page";
import { env } from "@/env.mjs";
import { ListSuratProps } from "@/interfaces";
import { getData } from "@/lib/utils/axios-config";
import { createPageMetadata } from "@/lib/utils/metadata";
import Image from "next/image";
import { Suspense } from "react";

const { NEXT_PUBLIC_QURAN_API } = env;

export const metadata = createPageMetadata({
  title: "Baca Al-Qur'an",
  description:
    "Baca Al-Qur'an lengkap dengan audio, transliterasi, terjemahan, dan tafsir.",
  path: "/quran",
});

async function getSurat(): Promise<ListSuratProps> {
  try {
    const response: ListSuratProps = await getData(
      `${NEXT_PUBLIC_QURAN_API}/quran`,
    );
    return response;
  } catch (err: any) {
    throw new Error("Failed to fetch data!");
  }
}

export default async function Quran() {
  const surat = await getSurat();

  return (
    <PageShell>
      <PageHeader
        title="Baca Al-Qur'an"
        description="Berlomba-lombalah dalam berbuat kebaikan."
        icon={
          <Image
            src="/img/Quran.webp"
            width={32}
            height={32}
            alt=""
            fetchPriority="high"
            draggable={false}
          />
        }
      />
      <Suspense>
        <QuranPage surat={surat} />
      </Suspense>
    </PageShell>
  );
}
