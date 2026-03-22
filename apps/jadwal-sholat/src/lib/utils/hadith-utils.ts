const ARABIC_REGEX = /[\u0600-\u06FF]/;
const NUMBER_REGEX = /^\d/;

export type HadithSearchType = "indonesian" | "arabic" | "number";

export function getHadithSearchType(query: string): HadithSearchType | null {
  const trimmed = query.trim();
  if (!trimmed) return null;
  const firstChar = trimmed[0];
  if (NUMBER_REGEX.test(firstChar)) return "number";
  if (ARABIC_REGEX.test(firstChar)) return "arabic";
  return "indonesian";
}
