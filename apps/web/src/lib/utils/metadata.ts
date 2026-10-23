import { SITE_URL } from "@jadwal-sholat/core/share";
import { MetaUrl } from "./enums";

export const SITE_NAME = "Jadwal Sholat";
export { SITE_URL };
export const DEFAULT_OG_IMAGE = MetaUrl.Default_Og_Url;
export const DEFAULT_DESCRIPTION =
  "Jadwal sholat hari ini sesuai lokasi, Al-Qur'an dengan audio dan terjemahan, hadith, Asmaul Husna, dan jadwal puasa sunnah.";

// Search results cut descriptions at about 155 characters.
const DESCRIPTION_LIMIT = 155;

export type PageMeta = {
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

/** The values BaseLayout writes into <head>: title, canonical and social tags. */
export function pageMeta({ title, description, path, absoluteTitle = false }: PageMeta) {
  return {
    canonical: new URL(path, SITE_URL).toString(),
    description,
    image: new URL(DEFAULT_OG_IMAGE, SITE_URL).toString(),
    title: absoluteTitle ? title : `${title} | ${SITE_NAME}`,
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
