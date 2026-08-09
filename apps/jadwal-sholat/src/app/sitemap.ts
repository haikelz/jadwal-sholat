import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils/metadata";

const routes = [
  "",
  "/asmaul-husna",
  "/doa-harian",
  "/hadith",
  "/puasa-sunnah",
  "/quran",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
  const quranRoutes = Array.from({ length: 114 }, (_, index) => ({
    url: `${SITE_URL}/quran/${index + 1}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...quranRoutes];
}
