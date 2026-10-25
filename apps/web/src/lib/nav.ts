import {
  BookMarked,
  BookOpen,
  Calendar,
  Clock4,
  List,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  /** Shorter label for the phone tab bar. */
  shortTitle: string;
  icon: LucideIcon;
  url: string;
};

export const navItems: NavItem[] = [
  { title: "Jadwal Sholat", shortTitle: "Jadwal", icon: Clock4, url: "/" },
  { title: "Al-Qur'an", shortTitle: "Qur'an", icon: BookMarked, url: "/quran" },
  { title: "Hadith", shortTitle: "Hadith", icon: BookOpen, url: "/hadith" },
  { title: "Asma'ul Husna", shortTitle: "Asmaul Husna", icon: List, url: "/asmaul-husna" },
  { title: "Puasa Sunnah", shortTitle: "Puasa", icon: Calendar, url: "/sunnah-fasting" },
];

// Pages that live under another section's tab: city schedules under the
// schedule, named ayat under the Qur'an.
const SECTION_ALIASES: Record<string, string[]> = {
  "/": ["/jadwal-sholat"],
  "/quran": ["/ayat"],
};

export function isNavItemActive(pathname: string, url: string) {
  if (SECTION_ALIASES[url]?.some((prefix) => pathname.startsWith(prefix))) return true;
  return url === "/" ? pathname === "/" : pathname.startsWith(url);
}
