/**
 * Structured data for search engines. `<` is escaped so text from the APIs
 * can't close the script tag (Next's JSON-LD guide).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
