import { Bitter, Noto_Naskh_Arabic, Rubik } from "next/font/google";

export const bitter = Bitter({
  style: ["normal"],
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-bitter",
  display: "swap",
});

export const rubik = Rubik({
  style: ["normal"],
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

export const arab = Noto_Naskh_Arabic({
  weight: ["700"],
  style: ["normal"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});
