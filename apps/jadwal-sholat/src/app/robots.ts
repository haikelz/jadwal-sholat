import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The same-origin proxy for the puasa API; nothing to index.
      disallow: "/api/",
    },
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/hadith/sitemap.xml`],
    host: SITE_URL,
  };
}
