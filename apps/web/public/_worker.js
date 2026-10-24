// Cloudflare Pages advanced mode. Pages reads this file from the build output,
// so it deploys whatever the project's root directory is (a functions/ folder
// only deploys when the root directory is apps/web). _routes.json runs it for
// /api/* only; every other request is a static asset, so _redirects and
// _headers keep working.
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

    return env.ASSETS.fetch(request);
  },
};
