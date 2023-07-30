import { cx } from "classix";
import { Metadata } from "next";
import { env } from "~env.mjs";
import { ofetch } from "~lib/utils/configured-ofetch";
import { DEFAULT_OG_URL, SITE_URL } from "~lib/utils/constants";
import { BaseSuratProps, ListSuratProps } from "~models";

import Client from "./client";

const { NEXT_PUBLIC_QURAN_API } = env;

export async function generateStaticParams(): Promise<{ number: string }[]> {
  const response: { data: ListSuratProps[] } = await ofetch(`${NEXT_PUBLIC_QURAN_API}/quran`);
  return response.data.map((item) => ({ number: item.number.toString() }));
}

export async function generateMetadata({
  params,
}: {
  params: { number: string };
}): Promise<Metadata | undefined> {
  const { number } = params;
  const response: { data: ListSuratProps } = await ofetch(
    `${NEXT_PUBLIC_QURAN_API}/quran/${number}?imamId=7`
  );
  const { asma } = response.data;

  return {
    title: `${asma.id.short} | Jadwal Sholat`,
    description: asma.translation.id,
    openGraph: {
      type: "book",
      url: `${SITE_URL}/quran/surat/${number}`,
      title: asma.id.short,
      description: asma.translation.id,
      siteName: "info-jadwal-sholat.vercel.app",
      images: [
        {
          url: DEFAULT_OG_URL,
          alt: "OG Image",
        },
      ],
    },
    twitter: {
      title: asma.id.short,
      description: asma.translation.id,
      site: `${SITE_URL}/quran/surat/${number}`,
      card: "summary_large_image",
    },
    metadataBase: new URL(`${SITE_URL}/quran/surat/${number}`),
  };
}

async function getData(number: string) {
  const response: { data: BaseSuratProps } = await ofetch(
    `${NEXT_PUBLIC_QURAN_API}/quran/${number}?imamId=7`
  );
  return response;
}

export default async function Surat({ params }: { params: { number: string } }) {
  const { number } = params;
  const surat = await getData(number);

  return (
    <div
      className={cx(
        "flex w-full max-w-full",
        "flex-col items-center justify-start",
        "space-y-7 pt-8 pb-24 md:pb-8"
      )}
    >
      <Client surat={surat.data} />
    </div>
  );
}
