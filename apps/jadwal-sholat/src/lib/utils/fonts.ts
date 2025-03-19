import { Geist } from "next/font/google";

export const geistSans = Geist({
  style: ["normal"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-ibmPlexSans",
  display: "swap",
});
