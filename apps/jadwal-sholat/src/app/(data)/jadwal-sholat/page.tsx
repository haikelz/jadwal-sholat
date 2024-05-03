import { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import TransitionLayout from "~components/transition-layout";
import { cn } from "~lib/utils/cn";
import { currentDate } from "~lib/utils/constants";
import { MetaUrl } from "~lib/utils/enums";
import { bitter } from "~lib/utils/fonts";

import JadwalSholatClient from "./client";

const ClientDate = dynamic(() => import("~components/client-date"), {
  loading: () => (
    <div className="w-10 h-6 animate-pulse bg-gray-300 dark:bg-gray-700"></div>
  ),
  ssr: false,
});

const baseMetadata = {
  title: "Jadwal Sholat",
  description: "Berikut daftar Kabupaten/Kota yang tersedia",
  url: `${MetaUrl.Site_Url}/jadwal-sholat`,
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
    siteName: "info-jadwal-sholat.vercel.app/jadwal-sholat",
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

export default function JadwalSholat() {
  return (
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
      <div className="flex mb-4 flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <h1
            className={cn(
              "text-3xl font-bold tracking-wide sm:text-4xl",
              bitter.className
            )}
          >
            Jadwal Sholat
          </h1>
          <Image
            src="/img/mosque.webp"
            width={40}
            height={40}
            alt="Mosque"
            fetchPriority="high"
            draggable={false}
          />
        </div>
        <p data-cy="description" className="mt-2 text-lg font-medium">
          Berikut Jadwal Sholat untuk bulan ini,{" "}
          <ClientDate date={currentDate} />
        </p>
      </div>
      <JadwalSholatClient />
    </TransitionLayout>
  );
}
