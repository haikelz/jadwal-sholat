import TransitionLayout from "@/components/transition-layout";
import { env } from "@/env.mjs";
import { ListSuratProps, SuratProps } from "@/interfaces";
import { getData } from "@/lib/utils/axios-config";
import { cn } from "@/lib/utils/cn";
import { MetaUrl } from "@/lib/utils/enums";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const SuratClient = dynamic(() => import("./client"));

const { NEXT_PUBLIC_QURAN_API } = env;

export async function generateStaticParams(): Promise<{ number: string }[]> {
  const response: ListSuratProps = await getData(
    `${NEXT_PUBLIC_QURAN_API}/quran`
  );

  return response.data.map((item) => ({ number: item.number.toString() }));
}

export async function generateMetadata(props: {
  params: Promise<{ number: string }>;
}): Promise<Metadata | undefined> {
  const { number } = await props.params;

  const response: SuratProps = await getData(
    `${NEXT_PUBLIC_QURAN_API}/quran/${number}`
  );

  const { asma, tafsir } = response.data;

  const base = {
    title: asma.id.short,
    description: tafsir.id,
    url: `${MetaUrl.Site_Url}/quran/${number}`,
  };

  return {
    title: base.title,
    description: base.description,
    openGraph: {
      type: "website",
      url: base.url,
      title: base.title,
      description: base.description,
      images: [
        {
          url: MetaUrl.Default_Og_Url,
          alt: "OG Image",
        },
      ],
      siteName: `jdwshlt.ekel.dev/quran/${number}`,
    },
    twitter: {
      title: base.title,
      description: base.description,
      site: base.url,
      card: "summary_large_image",
    },
    metadataBase: new URL(base.url),
  };
}

export default async function Surat(props: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await props.params;

  return (
    <>
      <TransitionLayout
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          "flex w-full max-w-full",
          "flex-col items-center justify-start",
          "pt-8 pb-24 md:pb-8"
        )}
      >
        <SuratClient number={number} />
      </TransitionLayout>
    </>
  );
}
