import type { Metadata } from "next";
import { SITE_URL } from "@jadwal-sholat/core/share";
import { MetaUrl } from "./enums";

export const SITE_NAME = "Jadwal Sholat";
export { SITE_URL };
export const DEFAULT_OG_IMAGE = MetaUrl.Default_Og_Url;
export const DEFAULT_DESCRIPTION =
  "Jadwal sholat hari ini sesuai lokasi, Al-Qur'an dengan audio dan terjemahan, hadith, Asmaul Husna, dan jadwal puasa sunnah.";

// Search results cut descriptions at about 155 characters.
const DESCRIPTION_LIMIT = 155;

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  /** Use the title as is, without the " | Jadwal Sholat" suffix. */
  absoluteTitle?: boolean;
};

/** Collapses whitespace and cuts at a word boundary, so snippets never end mid-word. */
export function toDescription(text: string, limit = DESCRIPTION_LIMIT) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;

  const cut = clean.slice(0, limit - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > limit / 2 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:–-]+$/, "")}…`;
}

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadata): Metadata {
  const url = new URL(path, SITE_URL).toString();
  // The layout's title template only applies to <title>; social cards get
  // the full title here.
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
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
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

/** schema.org BreadcrumbList; Google shows it as the result's path. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Beranda", path: "/" }, ...items].map(
      (item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: new URL(item.path, SITE_URL).toString(),
      }),
    ),
  };
}

/** schema.org WebSite for the site name shown in search results. */
export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "id-ID",
  description: DEFAULT_DESCRIPTION,
};
