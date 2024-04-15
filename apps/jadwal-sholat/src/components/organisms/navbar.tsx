"use client";

import { BookMarked, Clock4, HandHelping, Home, List } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx, slugify } from "~lib/helpers";

const SwitchTheme = dynamic(
  () => import("~components/atoms").then((obj) => obj.SwitchTheme),
  {
    ssr: false,
  }
);

const navbarList = [
  {
    id: 1,
    title: "Sholat",
    icon: Clock4,
  },
  {
    id: 2,
    title: "Asma'ul Husna",
    icon: List,
  },
  {
    id: 3,
    title: "Qur'an",
    icon: BookMarked,
  },
  { id: 4, title: "Do'a Harian", icon: HandHelping },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className={cx(
        "bg-gray-50 dark:bg-gray-800",
        "md:border-r md:border-r-gray-300 md:dark:border-r-gray-600"
      )}
    >
      <div
        className={cx(
          "fixed bottom-0 z-50 w-full flex justify-between px-4 py-2.5 flex-row items-center",
          "border-t border-t-gray-300 bg-gray-50 text-white",
          "dark:border-t-[1px] dark:border-t-gray-600 md:justify-center dark:bg-gray-800",
          "md:sticky md:top-0 md:left-0 md:max-h-screen md:min-h-screen",
          "md:max-w-[80px] md:flex-col md:gap-10",
          "md:border-t-0 md:px-7 md:dark:border-t-0"
        )}
      >
        <Link href="/">
          <button
            type="button"
            aria-label="home"
            className={cx(
              "flex cursor-pointer flex-col items-center justify-center p-2",
              "transition-all",
              "md:p-2.5",
              pathname === "/"
                ? "text-gray-600 dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            )}
          >
            <Home size={24} />
            <p className="hidden text-sm font-semibold md:block">Home</p>
          </button>
        </Link>
        {navbarList.map((item) => {
          const Icon = item.icon;
          return (
            <Link href={slugify(item.title)} key={item.id}>
              <button
                className={cx(
                  "flex cursor-pointer flex-col items-center justify-center p-2",
                  "transition-all md:p-2.5",
                  pathname.includes(slugify(item.title) as string)
                    ? "text-gray-600 dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                )}
              >
                <Icon size={24} />
                <p className="hidden text-sm font-bold md:block">
                  {item.title}
                </p>
              </button>
            </Link>
          );
        })}
        <SwitchTheme />
      </div>
    </nav>
  );
}
