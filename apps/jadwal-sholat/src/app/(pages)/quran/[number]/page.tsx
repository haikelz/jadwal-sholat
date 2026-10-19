import { PageShell } from "@/components/common/page-shell";
import { DetailSuratPage } from "@/components/quran/detail-surat/detail-surat-page";
import { env } from "@/lib/utils/public-env";
import { SuratProps } from "@/interfaces";
import { getData } from "@/lib/utils/axios-config";
import { createPageMetadata } from "@/lib/utils/metadata";
import { DEFAULT_QORI } from "@/lib/utils/qori-options";
import { Metadata } from "next";
import { cache } from "react";

const { NEXT_PUBLIC_QURAN_API } = env;

// One request per surah, shared by generateMetadata and the page.
const getSurat = cache((number: string): Promise<SuratProps> =>
  getData(`${NEXT_PUBLIC_QURAN_API}/quran/${number}?imamId=${DEFAULT_QORI}`),
);

// Render each surah on its first visit and cache it for a day instead of
// prerendering all 114 full surahs during `next build`, which needs a lot of
// memory now that the ayat are server-rendered.
export const revalidate = 86400;

export async function generateStaticParams(): Promise<{ number: string }[]> {
  return [];
}

export async function generateMetadata(props: {
  params: Promise<{ number: string }>;
}): Promise<Metadata | undefined> {
  const { number } = await props.params;

  const { asma, tafsir } = (await getSurat(number)).data;

  const description = tafsir.id.replace(/\s+/g, " ").trim().slice(0, 155);

  return createPageMetadata({
    title: `Surat ${asma.id.short}`,
    description,
    path: `/quran/${number}`,
  });
}

export default async function Surat(props: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await props.params;
  const surat = await getSurat(number);

  return (
    <PageShell>
      <DetailSuratPage number={number} initialData={surat} />
    </PageShell>
  );
}
