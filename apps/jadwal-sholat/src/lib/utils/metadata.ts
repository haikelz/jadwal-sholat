import type { Metadata } from "next";
import { MetaUrl } from "./enums";

export const SITE_NAME = "Jadwal Sholat";
export const SITE_URL = MetaUrl.Site_Url;
export const DEFAULT_OG_IMAGE = MetaUrl.Default_Og_Url;
export const DEFAULT_DESCRIPTION =
  "Jadwal sholat berdasarkan lokasi, Al-Qur'an, hadith, doa harian, Asmaul Husna, dan jadwal puasa sunnah.";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadata): Metadata {
  const url = new URL(path, SITE_URL).toString();

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      locale: "id_ID",
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Jadwal Sholat — waktu ibadah dan bacaan Islami",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
