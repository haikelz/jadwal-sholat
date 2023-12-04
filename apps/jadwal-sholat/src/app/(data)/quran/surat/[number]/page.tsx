import { Metadata } from "next";
import { ReadingProgress } from "~components/atoms";
import { env } from "~env.mjs";
import { ListSuratProps } from "~interfaces";
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

const baseMetadata = {
  title: "Baca Al-Qur'an | Jadwal Sholat",
  description: "Berlomba-lombalah kamu dalam berbuat kebaikan",
  url: MetaUrl.Site_Url,
};

const { title, description, url } = baseMetadata;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    url,
    title,
    description,
    images: [
      {
        url: MetaUrl.Default_Og_Url,
        alt: "OG Image",
      },
    ],
    siteName: "info-jadwal-sholat.vercel.app",
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

export default async function Surat({
  params,
}: {
  params: { number: string };
}): Promise<JSX.Element> {
  const { number } = params;

  return (
    <>
      <ReadingProgress />
      <div
        className={cx(
          "flex w-full max-w-full",
          "flex-col items-center justify-start",
          "pt-8 pb-24 md:pb-14"
        )}
      >
        <Client number={number} />
      </div>
    </>
  );
}
