import { Bitter, IBM_Plex_Sans, Noto_Sans_Arabic } from "next/font/google";

export const bitter = Bitter({
  style: ["normal"],
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-bitter",
  display: "swap",
});

export const ibmPlexSans = IBM_Plex_Sans({
  style: ["normal"],
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibmPlexSans",
  display: "swap",
});

export const notoSansArabic = Noto_Sans_Arabic({
  weight: ["600"],
  style: ["normal"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});
