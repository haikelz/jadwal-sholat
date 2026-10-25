import { sitemapXml } from "@/lib/sitemap";
import { SITE_URL } from "@/lib/utils/metadata";
import { CITIES } from "@jadwal-sholat/core/data";
import type { APIRoute } from "astro";

// "/" matches the homepage canonical (https://jdwshlt.ekel.dev/).
const ROUTES = ["/", "/quran", "/hadith", "/asmaul-husna", "/sunnah-fasting", "/jadwal-sholat"];

/** The static pages, the city schedules and the 114 surahs. */
export const GET: APIRoute = () =>
  sitemapXml([
    ...ROUTES.map((route) => `${SITE_URL}${route}`),
    ...CITIES.map((city) => `${SITE_URL}/jadwal-sholat/${city.slug}`),
    ...Array.from({ length: 114 }, (_, index) => `${SITE_URL}/quran/${index + 1}`),
  ]);
