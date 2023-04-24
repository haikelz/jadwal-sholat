import { Bitter, Noto_Naskh_Arabic, Rubik } from "next/font/google";

export const bitter = Bitter({
  style: ["normal"],
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
});

export const rubik = Rubik({
  style: ["normal"],
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const arab = Noto_Naskh_Arabic({
  style: ["normal"],
  subsets: ["arabic"],
  display: "swap",
});
