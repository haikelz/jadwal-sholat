// Cloudflare Pages Function. The puasa sunnah API sends no CORS header, so
// the browser asks this same-origin endpoint, which forwards the query.
// PUASA_SUNNAH_API comes from the Pages project's variables (or .env under
// wrangler pages dev).
export async function onRequestGet({
  request,
  env,
}: {
  request: Request;
  env: { PUASA_SUNNAH_API?: string };
}) {
  if (!env.PUASA_SUNNAH_API) {
    return Response.json({ error: "PUASA_SUNNAH_API is not set" }, { status: 500 });
  }

  const upstream = new URL("/api/id/fasting/schedules", env.PUASA_SUNNAH_API);
  upstream.search = new URL(request.url).search;

  const response = await fetch(upstream, {
    headers: { Accept: "application/json" },
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      // A month's schedule doesn't change; let browsers and the edge reuse it.
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "application/json",
    },
  });
}
