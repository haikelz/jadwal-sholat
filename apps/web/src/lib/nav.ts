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

export function isNavItemActive(pathname: string, url: string) {
  return url === "/" ? pathname === "/" : pathname.startsWith(url);
}
