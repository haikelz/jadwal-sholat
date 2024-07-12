"use client";

import { BookMarked, Clock4, HandHelping, Home, List } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~components/ui/button";
import { slugify } from "~lib/helpers";
import { cn } from "~lib/utils/cn";

const SwitchTheme = dynamic(() => import("~components/switch-theme"), {
  ssr: false,
});

const navbarList = [
  {
    id: 1,
    title: "Asma'ul Husna",
    icon: List,
  },
  {
    id: 2,
    title: "Qur'an",
    icon: BookMarked,
  },
  { id: 3, title: "Do'a Harian", icon: HandHelping },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "bg-white dark:bg-gray-800",
        "md:border-r md:border-r-gray-300 md:dark:border-r-gray-800"
      )}
    >
      <div
        className={cn(
          "fixed bottom-0 z-50 w-full flex justify-between px-4 py-2.5 flex-row items-center",
          "border-t border-t-gray-300 bg-white",
          "dark:border-t-[1px] dark:border-t-gray-800 md:justify-center dark:bg-gray-950",
          "md:sticky md:top-0 md:left-0 md:max-h-screen md:min-h-screen",
          "md:max-w-[80px] md:flex-col md:gap-10",
          "md:border-t-0 md:px-7 md:dark:border-t-0"
        )}
      >
        <Link href="/">
          <Button
            type="button"
            aria-label="home"
            size="icon"
            variant="outline"
            className={cn(pathname === "/" ? "bg-accent" : "")}
          >
            <Clock4 size={24} />
          </Button>
        </Link>
        {navbarList.map((item) => {
          const Icon = item.icon;
          return (
            <Link href={slugify(item.title)} key={item.id}>
              <Button
                size="icon"
                variant="outline"
                className={cn(
                  pathname.includes(slugify(item.title) as string)
                    ? "bg-accent"
                    : ""
                )}
              >
                <Icon size={24} />
              </Button>
            </Link>
          );
        })}
        <SwitchTheme />
      </div>
    </nav>
  );
}
