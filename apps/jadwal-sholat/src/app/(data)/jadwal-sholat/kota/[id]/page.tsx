import { cx } from "classix";
import { env } from "~env.mjs";
import { KotaProps } from "~interfaces";
import { getData } from "~lib/utils/axios-config";
import { DEFAULT_OG_URL, SITE_URL } from "~lib/utils/constants";

import Client from "./client";

const { NEXT_PUBLIC_JADWAL_SHOLAT_API } = env;

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const response: KotaProps[] = await getData(`${NEXT_PUBLIC_JADWAL_SHOLAT_API}/kota/semua`);
  return response.map((item) => ({
    id: item.id,
  }));
}

const baseMetadata = {
  title: "Jadwal Sholat",
  description: "Berikut daftar Kabupaten/Kota yang tersedia",
  url: SITE_URL,
};

const { title, description, url } = baseMetadata;

export const metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    url,
    title,
    description,
    images: [
      {
        url: DEFAULT_OG_URL,
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

export default async function KotaId({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div
      className={cx(
        "flex w-full max-w-full",
        "flex-col items-center justify-start",
        "space-y-7 pt-8 pb-24 md:pb-8"
      )}
    >
      <Client id={id} />
    </div>
  );
}
