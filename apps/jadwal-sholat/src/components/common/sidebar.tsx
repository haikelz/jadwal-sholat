"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ChildrenProps } from "@/interfaces";
import { slugify } from "@/lib/helpers";
import { cn } from "@/lib/utils/cn";
import { Separator } from "@radix-ui/react-separator";
import {
  BookMarked,
  BookOpen,
  Calendar,
  Clock4,
  HandHelping,
  List,
  LucideIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const SwitchTheme = dynamic(
  () => import("@/components/switch-theme").then((mod) => mod.SwitchTheme),
  {
    ssr: false,
  },
);
const ReadingProgress = dynamic(
  () =>
    import("@/components/quran/detail-surat/reading-progress").then(
      (comp) => comp.ReadingProgress,
    ),
  { ssr: false },
);

const navbarList = [
  {
    id: 1,
    title: "Asma'ul Husna",
    icon: List,
    url: "/asmaul-husna",
  },
  {
    id: 2,
    title: "Qur'an",
    icon: BookMarked,
    url: "/quran",
  },
  {
    id: 3,
    title: "Hadith",
    icon: BookOpen,
    url: "/hadith",
  },
  { id: 4, title: "Do'a Harian", icon: HandHelping, url: "/doa-harian" },
  { id: 5, title: "Puasa Sunnah", icon: Calendar, url: "/puasa-sunnah" },
];

export function CustomSidebar({ children }: ChildrenProps) {
  const pathname = usePathname();
  const routeSegments = pathname.slice(1).split("/").filter(Boolean);
  const currentRouteTitle =
    pathname === "/"
      ? "Jadwal Sholat"
      : (navbarList.find((item) => pathname.startsWith(item.url))?.title ??
        "Jadwal Sholat");

  const breadcrumbItems = routeSegments.map((segment, index) => {
    const path = "/" + routeSegments.slice(0, index + 1).join("/");

    return {
      title:
        segment === ""
          ? "Jadwal Sholat"
          : (segment[0].toUpperCase() + segment.slice(1)).replace("-", " "),
      url: path,
    };
  });

  const routesList =
    pathname === "/"
      ? [{ title: "Jadwal Sholat", url: "/" }]
      : [{ title: "Jadwal Sholat", url: "/" }, ...breadcrumbItems];

  return (
    <SidebarProvider>
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[60] rounded-md bg-background px-4 py-2 font-semibold text-foreground shadow-lg focus:not-sr-only"
      >
        Lewati ke konten utama
      </a>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup className="pt-4">
            <SidebarGroupLabel className="mb-2 px-3 text-xs font-semibold tracking-wide text-sidebar-foreground/60">
              jdwshlt.ekel.dev
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    size="lg"
                    isActive={pathname === "/"}
                    tooltip="Jadwal Sholat"
                  >
                    <Link
                      href="/"
                      aria-current={pathname === "/" ? "page" : undefined}
                    >
                      <Clock4 />
                      <span>Jadwal Sholat</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {navbarList.map((item) => {
                  const Icon: LucideIcon = item.icon;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        asChild
                        size="lg"
                        isActive={pathname.startsWith(item.url)}
                        tooltip={item.title}
                      >
                        <Link
                          href={slugify(item.title)}
                          aria-current={
                            pathname.startsWith(item.url) ? "page" : undefined
                          }
                        >
                          <Icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="flex items-end justify-center border-t border-sidebar-border p-4">
          <SwitchTheme />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset id="main-content" tabIndex={-1}>
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b bg-background/90 px-3 backdrop-blur-xl sm:px-5">
          <nav
            aria-label="Navigasi halaman"
            className="flex w-full items-center justify-between gap-3"
          >
            <div className="flex min-w-0 items-center gap-2">
              <SidebarTrigger />
              <Separator
                orientation="vertical"
                className="hidden h-5 sm:block"
              />
              <span className="truncate text-sm font-semibold sm:hidden">
                {currentRouteTitle}
              </span>
              <Breadcrumb>
                <BreadcrumbList>
                  {routesList.map((item, index) => (
                    <Fragment key={index + 1}>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink asChild>
                          <Link
                            href={item.url}
                            className={cn(
                              pathname === item.url ? "font-bold" : "",
                            )}
                          >
                            {item.title}
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index >= routesList.length - 1 ? null : (
                        <BreadcrumbSeparator className="hidden md:block" />
                      )}
                    </Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            {routeSegments.includes("quran") && routeSegments.length >= 2 ? (
              <ReadingProgress />
            ) : null}
          </nav>
        </header>
        <div className="flex min-h-svh w-full justify-center">
          <section
            className={cn(
              "flex min-h-screen w-full min-w-0 flex-col px-4",
              "bg-background text-foreground sm:px-6 lg:px-8",
            )}
          >
            {children}
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
