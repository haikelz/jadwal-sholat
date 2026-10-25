// Cloudflare Pages advanced mode. Pages reads this file from the build output,
// so it deploys whatever the project's root directory is (a functions/ folder
// only deploys when the root directory is apps/web). _routes.json runs it for
// /api/* and /hadith/* only; every other request is a static asset, so
// _redirects and _headers keep working.
const HADITH_PATH = /^\/hadith\/([a-z-]+)\/([1-9]\d*)$/;
// Mirrors SITE_NAME and toDescription in src/lib/utils/metadata.ts.
const SITE_NAME = "Jadwal Sholat";
const DESCRIPTION_LIMIT = 155;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // The puasa sunnah API sends no CORS header, so the browser asks this
    // same-origin endpoint, which forwards the query.
    if (url.pathname === "/api/sunnah-fasting" && request.method === "GET") {
      // Set in the Pages project's variables, or in .env for wrangler pages dev.
      if (!env.PUASA_SUNNAH_API) {
        return Response.json({ error: "PUASA_SUNNAH_API is not set" }, { status: 500 });
      }

      const upstream = new URL("/api/id/fasting/schedules", env.PUASA_SUNNAH_API);
      upstream.search = url.search;
      const response = await fetch(upstream, { headers: { Accept: "application/json" } });

      return new Response(response.body, {
        status: response.status,
        headers: {
          // The API caches a dated month for an hour and sends no-store on
          // errors, so a failed request isn't reused.
          "Cache-Control": response.headers.get("Cache-Control") ?? "no-store",
          "Content-Type": "application/json",
        },
      });
    }

    const hadith = url.pathname.match(HADITH_PATH);
    if (hadith && request.method === "GET") return serveHadith(url, hadith[1], hadith[2], env);

    return env.ASSETS.fetch(request);
  },
};

/**
 * Every /hadith/<book>/<n> URL serves the /hadith-detail shell, which loads
 * the hadith in the browser. Write the hadith's own title, description,
 * canonical and breadcrumb into that HTML, so link previews and crawlers that
 * skip JavaScript see the real page. The page sets the same values once the
 * hadith loads (describeHadith in src/components/hadith/detail-hadith-page.tsx).
 */
async function serveHadith(url, book, number, env) {
  const shell = await env.ASSETS.fetch(new URL("/hadith-detail", url));
  if (!env.HADITH_API || !shell.ok) return shell;

  let hadith;
  try {
    const response = await fetch(`${env.HADITH_API}/books/${book}/${number}`, {
      headers: { Accept: "application/json" },
      // Hadith text doesn't change: keep it at Cloudflare's edge for a day.
      cf: { cacheTtlByStatus: { "200-299": 86400, 404: 3600, "500-599": 0 } },
    });
    // A missing hadith is a real 404; the page shows its not-found state.
    if (response.status === 404) {
      return new Response(shell.body, { status: 404, headers: shell.headers });
    }
    if (!response.ok) return shell;
    hadith = (await response.json()).data;
  } catch {
    return shell;
  }
  if (!hadith?.name || !hadith.contents?.id) return shell;

  const title = `${hadith.name} No. ${number}`;
  const fullTitle = `${title}: Arab dan Terjemahan | ${SITE_NAME}`;
  const description = toDescription(hadith.contents.id);
  const canonical = `${url.origin}${url.pathname}`;
  const breadcrumb = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      ["Beranda", "/"],
      ["Hadith", "/hadith"],
      [title, url.pathname],
    ].map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${url.origin}${path}`,
    })),
  }).replace(/</g, "\\u003c");

  const setContent = (value) => ({ element: (element) => element.setAttribute("content", value) });
  const page = new HTMLRewriter()
    .on("title", { element: (element) => element.setInnerContent(fullTitle) })
    .on('meta[name="description"]', setContent(description))
    .on('meta[property="og:description"]', setContent(description))
    .on('meta[name="twitter:description"]', setContent(description))
    .on('meta[property="og:title"]', setContent(fullTitle))
    .on('meta[name="twitter:title"]', setContent(fullTitle))
    // The shell has no canonical or og:url (BaseLayout noCanonical); the
    // page's script finds these and keeps them up to date.
    .on("head", {
      element: (element) =>
        element.append(
          `<link rel="canonical" href="${canonical}"><meta property="og:url" content="${canonical}"><script id="hadith-breadcrumb" type="application/ld+json">${breadcrumb}</script>`,
          { html: true },
        ),
    })
    .transform(shell);

  // The shell's ETag describes the shell, not this page.
  const headers = new Headers(page.headers);
  headers.delete("ETag");
  return new Response(page.body, { status: page.status, headers });
}

/** Collapses whitespace and cuts at a word boundary, so snippets never end mid-word. */
function toDescription(text, limit = DESCRIPTION_LIMIT) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;

  const cut = clean.slice(0, limit - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > limit / 2 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:–-]+$/, "")}…`;
}
