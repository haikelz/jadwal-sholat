"use client";

import { cn } from "@/lib/utils/cn";
import {
  BookMarked,
  BookOpen,
  Calendar,
  Clock4,
  List,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = {
  title: string;
  /** Shorter label for the mobile tab bar. */
  shortTitle: string;
  icon: LucideIcon;
  url: string;
};

// Order and labels follow the "Next Layout" canvas.
export const navItems: NavItem[] = [
  { title: "Jadwal Sholat", shortTitle: "Jadwal", icon: Clock4, url: "/" },
  { title: "Al-Qur'an", shortTitle: "Qur'an", icon: BookMarked, url: "/quran" },
  { title: "Hadith", shortTitle: "Hadith", icon: BookOpen, url: "/hadith" },
  {
    title: "Asma'ul Husna",
    shortTitle: "Asmaul Husna",
    icon: List,
    url: "/asmaul-husna",
  },
  {
    title: "Puasa Sunnah",
    shortTitle: "Puasa",
    icon: Calendar,
    url: "/sunnah-fasting",
  },
];

export function isNavItemActive(pathname: string, url: string) {
  return url === "/" ? pathname === "/" : pathname.startsWith(url);
}

/** Thumb-reachable section tabs for phones; desktop uses the top bar. */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="grid grid-cols-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isNavItemActive(pathname, item.url);
          return (
            <li key={item.url} className="flex">
              <Link
                href={item.url}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-h-14 w-full min-w-0 flex-col items-center justify-center gap-1 px-1 text-xs transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset",
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon aria-hidden="true" className="size-5 shrink-0" />
                <span className="max-w-full truncate">{item.shortTitle}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
