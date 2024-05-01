import { Bitter, IBM_Plex_Sans } from "next/font/google";

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
