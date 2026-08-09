import { Geist } from "next/font/google";
import localFont from "next/font/local";

export const geistSans = Geist({
  style: ["normal"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const lpmqIsepMisbah = localFont({
  src: [
    {
      path: "../../../public/fonts/lpmq-isepmisbah/lpmq-isepmisbah.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-lpmq",
  display: "swap",
});
