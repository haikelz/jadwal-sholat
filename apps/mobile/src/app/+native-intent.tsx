// Shared ayah links use the website's "#ayat-N" anchor, in either form:
// https://jdwshlt.ekel.dev/quran/2#ayat-255 or jadwalsholat://quran/2#ayat-255.
// The surah screen reads "?ayat=N" instead, so rewrite the anchor.
const AYAH_ANCHOR = /^([^#]*)#ayat-(\d+)$/;

// Website links shared before the English paths still carry the old one.
const OLD_PATHS = /\/puasa-sunnah(?=$|[/?#])/;

export function redirectSystemPath({ path: rawPath }: { path: string; initial: boolean }) {
  // String matching only: a throw here would crash the app on open.
  try {
    const path = rawPath.replace(OLD_PATHS, "/sunnah-fasting");
    const match = AYAH_ANCHOR.exec(path);
    if (!match) return path;

    const [, base, ayat] = match;
    return `${base}${base.includes("?") ? "&" : "?"}ayat=${ayat}`;
  } catch {
    return rawPath;
  }
}
