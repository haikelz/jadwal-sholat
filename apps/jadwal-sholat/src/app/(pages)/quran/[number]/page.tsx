import { JsonLd } from "@/components/common/json-ld";
import { PageShell } from "@/components/common/page-shell";
import { DetailSuratPage } from "@/components/quran/detail-surat/detail-surat-page";
import { env } from "@/lib/utils/public-env";
import { SuratProps } from "@/interfaces";
import { getData } from "@/lib/utils/get-data";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  toDescription,
} from "@/lib/utils/metadata";
import { DEFAULT_QORI } from "@/lib/utils/qori-options";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

const { NEXT_PUBLIC_QURAN_API } = env;

// One request per surah, shared by generateMetadata and the page.
const getSurat = cache((number: string): Promise<SuratProps> =>
  getData(`${NEXT_PUBLIC_QURAN_API}/quran/${number}?imamId=${DEFAULT_QORI}`),
);

// Anything else is a real 404, not a page that fails in the browser.
function isSurahNumber(number: string) {
  return /^[1-9]\d*$/.test(number) && Number(number) <= 114;
}

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
  if (!isSurahNumber(number)) notFound();

  const { asma, ayahCount, type } = (await getSurat(number)).data;

  return createPageMetadata({
    title: `Surat ${asma.id.short} (${asma.ar.short}): Arab, Latin dan Artinya`,
    description: toDescription(
      `Baca Surat ${asma.id.short} (${asma.translation.id}), surat ke-${number}, ${type.id}, ${ayahCount} ayat: teks Arab, latin, terjemahan Indonesia, tafsir, dan audio murottal.`,
    ),
    path: `/quran/${number}`,
  });
}

export default async function Surat(props: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await props.params;
  if (!isSurahNumber(number)) notFound();
  const surat = await getSurat(number);

  return (
    <PageShell width="reading">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Al-Qur'an", path: "/quran" },
          { name: `Surat ${surat.data.asma.id.short}`, path: `/quran/${number}` },
        ])}
      />
      <DetailSuratPage number={number} initialData={surat} />
    </PageShell>
  );
}
