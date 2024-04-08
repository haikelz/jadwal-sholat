import { Metadata } from "next";
import { ReadingProgress } from "~components/atoms";
import TransitionLayout from "~components/layout/transition-layout";
import { env } from "~env.mjs";
import { ListSuratProps, SuratProps } from "~interfaces";
import { cx } from "~lib/helpers";
import { getData } from "~lib/utils/axios-config";
import { MetaUrl } from "~lib/utils/enums";

import Client from "./client";

const { NEXT_PUBLIC_QURAN_API } = env;

export async function generateStaticParams(): Promise<{ number: string }[]> {
  const response: ListSuratProps = await getData(
    `${NEXT_PUBLIC_QURAN_API}/quran`
  );

  return response.data.map((item) => ({ number: item.number.toString() }));
}

export async function generateMetadata(
  { params }: { params: { number: string } }
): Promise<Metadata | undefined> {
  const { number } = params;

  const response: SuratProps = await getData(
    `${NEXT_PUBLIC_QURAN_API}/quran/${number}`
  );

  const { asma, tafsir } = response.data;

  return {
    title: asma.id.short,
    description: tafsir.id,
    openGraph: {
      type: "website",
      url: `${MetaUrl.Site_Url}/quran/surat/${number}`,
      title: asma.id.short,
      description: tafsir.id,
      images: [
        {
          url: MetaUrl.Default_Og_Url,
          alt: "OG Image",
        },
      ],
      siteName: `info-jadwal-sholat.vercel.app/quran/surat/${number}`,
    },
    twitter: {
      title: asma.id.short,
      description: tafsir.id,
      site: `${MetaUrl.Site_Url}/quran/surat/${number}`,
      card: "summary_large_image",
    },
    metadataBase: new URL(MetaUrl.Site_Url),
  };
}

export default async function Surat(
  { params }: { params: { number: string } }
) {
  const { number } = params;

  return (
    <>
      <ReadingProgress />
      <TransitionLayout
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cx(
          "flex w-full max-w-full",
          "flex-col items-center justify-start",
          "pt-8 pb-24 md:pb-14"
        )}
      >
        <Client number={number} />
      </TransitionLayout>
    </>
  );
}
