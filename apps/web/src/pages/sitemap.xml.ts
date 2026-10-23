import { sitemapXml } from "@/lib/sitemap";
import { SITE_URL } from "@/lib/utils/metadata";
import type { APIRoute } from "astro";

const ROUTES = ["", "/quran", "/hadith", "/asmaul-husna", "/sunnah-fasting"];

/** The static pages and the 114 surahs. */
export const GET: APIRoute = () =>
  sitemapXml([
    ...ROUTES.map((route) => `${SITE_URL}${route}`),
    ...Array.from({ length: 114 }, (_, index) => `${SITE_URL}/quran/${index + 1}`),
  ]);
