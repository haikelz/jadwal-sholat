"use client";

import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/helpers";
import { cn } from "@/lib/utils/cn";
import {
  BookMarked,
  Clock4,
  HandHelping,
  List,
  LucideIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SwitchTheme = dynamic(() => import("@/components/switch-theme"), {
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
    <div
      className={cn(
        "fixed bottom-0 z-50 mx-auto md:mx-0 left-0 right-0 rounded-none md:w-full flex justify-center space-x-4 md:space-x-0 md:justify-between px-4 py-2.5 flex-row items-center",
        "border border-t-gray-200 md:border-t-0 bg-white",
        "md:border-0 dark:border-t-gray-800 md:dark:border-t-0 md:justify-center backdrop-blur-sm dark:bg-gray-950",
        "md:sticky md:top-0 md:left-0 md:max-h-screen md:min-h-screen",
        "md:max-w-[80px] md:flex-col gap-4 md:gap-10 md:border-r",
        "md:border-r md:border-r-gray-200 md:px-7 transition-all md:dark:border-r-gray-800"
      )}
    >
      <Link className="rounded-full" href="/">
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
        const Icon: LucideIcon = item.icon;
        return (
          <Link
            className="rounded-full"
            href={slugify(item.title)}
            key={item.id}
          >
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
  );
}
