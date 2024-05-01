import { Metadata } from "next";
import TransitionLayout from "~components/transition-layout";
import { env } from "~env.mjs";
import { KotaProps } from "~interfaces";
import { getData } from "~lib/utils/axios-config";
import { cn } from "~lib/utils/cn";
import { MetaUrl } from "~lib/utils/enums";

import Client from "./client";

const { NEXT_PUBLIC_JADWAL_SHOLAT_API } = env;

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const response: KotaProps = await getData(
    `${NEXT_PUBLIC_JADWAL_SHOLAT_API}/kota/semua`
  );
  return response.data.map((item) => ({
    id: item.id,
  }));
}

interface ResponseMetadataKotaProps {
  data: {
    id: string;
    lokasi: string;
  };
}

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata | undefined> {
  const response: ResponseMetadataKotaProps = await getData(
    `${NEXT_PUBLIC_JADWAL_SHOLAT_API}/kota/${params.id}`
  );
  const { id, lokasi } = response.data;

  const base = {
    title: `Jadwal Sholat ${lokasi}`,
    description: `Jadwal Sholat di ${lokasi}`,
    url: `${MetaUrl.Site_Url}/jadwal-sholat/kota/${id}`,
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
          url: base.url,
          alt: "OG Image",
        },
      ],
      siteName: `info-jadwal-sholat.vercel.app/jadwal-sholat/kota/${id}`,
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

export default async function KotaId({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <TransitionLayout
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "flex w-full max-w-full",
        "flex-col items-center justify-start",
        "space-y-7 pt-8 pb-24 md:pb-8"
      )}
    >
      <Client id={id} />
    </TransitionLayout>
  );
}
