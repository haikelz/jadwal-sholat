"use client";

import {
  BottomNav,
  isNavItemActive,
  navItems,
} from "@/components/common/bottom-nav";
import { ChildrenProps } from "@/interfaces";
import { cn } from "@/lib/utils/cn";
import { ChevronLeft } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SwitchTheme = dynamic(
  () => import("@/components/switch-theme").then((mod) => mod.SwitchTheme),
  { ssr: false },
);
const ReadingProgress = dynamic(
  () =>
    import("@/components/quran/detail-surat/reading-progress").then(
      (comp) => comp.ReadingProgress,
    ),
  { ssr: false },
);

// Detail routes get a back link on phones: /quran/<n>, /hadith/<book>/<n>.
function isDetailRoute(segments: string[]) {
  return (
    (segments[0] === "quran" && segments.length >= 2) ||
    (segments[0] === "hadith" && segments.length >= 3)
  );
}

/**
 * Site chrome: a top bar with the section links from md up, a slim title
 * bar plus the bottom tab bar on phones. A companion site, not an app shell,
 * so there is no sidebar.
 */
export function AppShell({ children }: ChildrenProps) {
  const pathname = usePathname();
  const segments = pathname.slice(1).split("/").filter(Boolean);
  const section = navItems.find(
    (item) => item.url !== "/" && isNavItemActive(pathname, item.url),
  );
  const isQuranDetail = segments[0] === "quran" && segments.length >= 2;
  const backHref = section && isDetailRoute(segments) ? section.url : null;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only fixed top-4 left-4 z-60 bg-background p-2 text-sm font-semibold text-foreground focus:not-sr-only"
      >
        Lewati ke konten utama
      </a>
      {/* h-14 on phones, h-16 from md: sticky page toolbars sit below it. */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-3 px-4 sm:px-6 md:h-16 lg:px-8">
          {/* Phones: back link on detail pages, then the section title. */}
          <div className="flex min-w-0 items-center gap-1 md:hidden">
            {backHref ? (
              <Link
                href={backHref}
                aria-label="Kembali"
                className="-ml-3 inline-flex size-11 shrink-0 items-center justify-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </Link>
            ) : null}
            <span className="truncate text-sm font-semibold">
              {section?.title ?? "Jadwal Sholat"}
            </span>
          </div>

          {/* md and up: wordmark and section links. */}
          <div className="hidden min-w-0 items-center gap-6 md:flex">
            <Link
              href="/"
              className="shrink-0 rounded-md text-sm font-semibold outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Jadwal Sholat
            </Link>
            <nav aria-label="Navigasi utama">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = isNavItemActive(pathname, item.url);
                  return (
                    <li key={item.url}>
                      <Link
                        href={item.url}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "inline-flex h-9 items-center rounded-md px-3 text-sm whitespace-nowrap transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                          isActive
                            ? "bg-muted font-medium text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {item.url === "/" ? item.shortTitle : item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {isQuranDetail ? <ReadingProgress /> : null}
            <SwitchTheme />
          </div>
        </div>
      </header>
      <main
        id="main-content"
        tabIndex={-1}
        className="flex w-full min-w-0 flex-1 flex-col px-4 outline-none sm:px-6 lg:px-8"
      >
        {children}
      </main>
      <BottomNav />
    </>
  );
}
