import { SITE_URL } from "@/lib/utils/metadata";
import type { APIRoute } from "astro";

// /api/ is the puasa proxy, /hadith-detail the shell that every
// /hadith/<book>/<n> URL is served from, and /offline what the service worker
// shows for unsaved pages; none is a page of its own.
export const GET: APIRoute = () =>
  new Response(
    [
      "User-Agent: *",
      "Allow: /",
      "Disallow: /api/",
      "Disallow: /hadith-detail",
      "Disallow: /offline",
      "",
      `Host: ${SITE_URL}`,
      `Sitemap: ${SITE_URL}/sitemap.xml`,
      `Sitemap: ${SITE_URL}/sitemap-hadith.xml`,
      "",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
