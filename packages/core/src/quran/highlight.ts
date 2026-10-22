export type HighlightPart = {
  text: string;
  match: boolean;
};

/**
 * Splits `text` around case-insensitive matches of `query`, so each UI can
 * render matches in its own element (`<mark>` on the web, `<Text>` on mobile).
 */
export function splitHighlight(text: string, query: string): HighlightPart[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [{ match: false, text }];

  const parts: HighlightPart[] = [];
  const haystack = text.toLowerCase();
  let cursor = 0;
  let index = haystack.indexOf(needle);

  while (index !== -1) {
    if (index > cursor) parts.push({ match: false, text: text.slice(cursor, index) });
    parts.push({ match: true, text: text.slice(index, index + needle.length) });
    cursor = index + needle.length;
    index = haystack.indexOf(needle, cursor);
  }

  if (cursor < text.length) parts.push({ match: false, text: text.slice(cursor) });
  return parts;
}
