/** Canonical site; shared links point here so people without the app can open them. */
export const SITE_URL = "https://jdwshlt.ekel.dev";

// Long excerpts get cut in chat previews anyway; keep messages readable.
export const EXCERPT_LIMIT = 200;

export function shortenExcerpt(text: string, limit = EXCERPT_LIMIT) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > limit ? `${clean.slice(0, limit).trimEnd()}…` : clean;
}

export function surahPath(surahNumber: number) {
  return `/quran/${surahNumber}`;
}

/** Ayah links use the `#ayat-N` anchors both apps understand. */
export function ayahPath(surahNumber: number, ayahNumber: number) {
  return `${surahPath(surahNumber)}#ayat-${ayahNumber}`;
}

export function hadithPath(bookId: string, hadithNumber: number) {
  return `/hadith/${bookId}/${hadithNumber}`;
}

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

/** Title, then the shortened excerpt when there is one. */
export function shareText(title: string, excerpt?: string) {
  return excerpt ? `${title}\n${shortenExcerpt(excerpt)}` : title;
}
