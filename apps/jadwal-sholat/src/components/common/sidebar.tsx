"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChildrenProps } from "@/interfaces";
import { slugify } from "@/lib/helpers";
import {
  BookMarked,
  BookOpen,
  Calendar,
  Clock4,
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
  { id: 5, title: "Puasa Sunnah", icon: Calendar, url: "/puasa-sunnah" },
];

export function CustomSidebar({ children }: ChildrenProps) {
  return (
    <SidebarProvider>
      <SidebarShell>{children}</SidebarShell>
    </SidebarProvider>
  );
}

function SidebarShell({ children }: ChildrenProps) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const routeSegments = pathname.slice(1).split("/").filter(Boolean);
  const section = navbarList.find((item) => pathname.startsWith(item.url));
  const currentRouteTitle = section?.title ?? "Jadwal Sholat";
  const [, first, second] = routeSegments;
  const detailTitle =
    section?.url === "/quran" && first
      ? `Surat ${first}`
      : section?.url === "/hadith" && first && second
        ? `HR. ${first[0].toUpperCase()}${first.slice(1)} no. ${second}`
        : null;

  const routesList = [
    { title: "Jadwal Sholat", url: "/" },
    ...(section ? [{ title: section.title, url: section.url }] : []),
    ...(detailTitle ? [{ title: detailTitle, url: pathname }] : []),
  ];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only fixed top-4 left-4 z-60 bg-background p-2 text-sm font-semibold text-foreground focus:not-sr-only"
      >
        Lewati ke konten utama
      </a>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader>
          <span className="px-2 text-xs font-medium text-muted-foreground">
            jdwshlt.ekel.dev
          </span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {[
                  { id: 0, title: "Jadwal Sholat", icon: Clock4, url: "/" },
                  ...navbarList,
                ].map((item) => {
                  const Icon: LucideIcon = item.icon;
                  const isActive =
                    item.url === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.url);
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                      >
                        <Link
                          href={item.url === "/" ? "/" : slugify(item.title)}
                          aria-current={isActive ? "page" : undefined}
                          onClick={() => setOpenMobile(false)}
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
      </Sidebar>
      <SidebarInset id="main-content" tabIndex={-1} className="min-w-0">
        <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-2 border-b bg-background/90 px-4 backdrop-blur sm:px-6">
          <nav
            aria-label="Navigasi halaman"
            className="flex w-full min-w-0 items-center justify-between gap-3"
          >
            <div className="flex min-w-0 items-center gap-2">
              <SidebarTrigger aria-label="Buka atau tutup navigasi" />
              <Separator
                orientation="vertical"
                className="data-[orientation=vertical]:h-4"
              />
              <span className="truncate text-sm font-medium md:hidden">
                {currentRouteTitle}
              </span>
              <Breadcrumb className="hidden md:block">
                <BreadcrumbList>
                  {routesList.map((item, index) => {
                    const isLast = index === routesList.length - 1;
                    return (
                      <Fragment key={item.url}>
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage>{item.title}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink asChild>
                              <Link href={item.url}>{item.title}</Link>
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {isLast ? null : <BreadcrumbSeparator />}
                      </Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {routeSegments.includes("quran") && routeSegments.length >= 2 ? (
                <ReadingProgress />
              ) : null}
              <SwitchTheme />
            </div>
          </nav>
        </header>
        <div className="flex w-full min-w-0 flex-1 flex-col px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </SidebarInset>
    </>
  );
}
