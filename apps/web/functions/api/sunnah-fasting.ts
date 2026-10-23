// Cloudflare Pages Function. The puasa sunnah API sends no CORS header, so
// the browser asks this same-origin endpoint, which forwards the query.
const UPSTREAM = "https://puasasunnah.ekel.dev/api/id/fasting/schedules";

export async function onRequestGet({ request }: { request: Request }) {
  const upstream = new URL(UPSTREAM);
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
