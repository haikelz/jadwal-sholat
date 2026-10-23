/** A sitemap urlset for absolute URLs. */
export function sitemapXml(urls: string[]) {
  const body = urls.map((url) => `<url><loc>${url}</loc></url>`).join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
