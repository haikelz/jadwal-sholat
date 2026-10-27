import { OG_PAGES, type OgPage } from "@/lib/og-pages";
import { SITE_URL } from "@/lib/utils/metadata";
import { OGImageRoute } from "astro-og-canvas";

// Social images (1200×630) for every page in OG_PAGES, rendered at build time
// with the site's font (Geist) and its mosque icon. Latin text only: the
// renderer has no Arabic font loaded.
const host = new URL(SITE_URL).host;
const geist = (weight: 400 | 700) =>
  `./node_modules/@fontsource/geist/files/geist-latin-${weight}-normal.woff`;

export const { getStaticPaths, GET } = await OGImageRoute({
  pages: OG_PAGES,
  getImageOptions: (_path, page: OgPage) => ({
    // A word joiner after each hyphen keeps "Al-Hasyr" on one line.
    title: page.title.replaceAll("-", "-\u2060"),
    description: `${page.description}\n${host}`,
    bgGradient: [[255, 255, 255]],
    logo: { path: "./public/img/icon-512x512.png", size: [128] },
    // The green of the icon's domes, as a bar along the bottom edge.
    border: { color: [71, 178, 104], width: 16, side: "block-end" },
    padding: 80,
    fonts: [geist(400), geist(700)],
    font: {
      title: { color: [10, 10, 10], size: 68, weight: "Bold", lineHeight: 1.15, families: ["Geist"] },
      description: { color: [82, 82, 82], size: 34, weight: "Normal", lineHeight: 1.4, families: ["Geist"] },
    },
  }),
});
