"use client";

import {
  BottomNav,
  isNavItemActive,
  navItems,
} from "@/components/common/bottom-nav";
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
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const currentRouteTitle =
    navItems.find(
      (item) => item.url !== "/" && isNavItemActive(pathname, item.url),
    )?.title ?? "Jadwal Sholat";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only fixed top-4 left-4 z-60 bg-background p-2 text-sm font-semibold text-foreground focus:not-sr-only"
      >
        Lewati ke konten utama
      </a>
      {/* Desktop navigation. On phones the bottom tab bar replaces it, and
          with no trigger shown there the mobile sheet never opens. */}
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
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isNavItemActive(pathname, item.url);
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                      >
                        <Link
                          href={item.url}
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
        <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-background/90 px-4 backdrop-blur sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarTrigger
              aria-label="Buka atau tutup navigasi"
              className="hidden md:inline-flex"
            />
            <Separator
              orientation="vertical"
              className="hidden md:block data-[orientation=vertical]:h-4"
            />
            <span className="truncate text-sm font-medium">
              {currentRouteTitle}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {routeSegments.includes("quran") && routeSegments.length >= 2 ? (
              <ReadingProgress />
            ) : null}
            <SwitchTheme />
          </div>
        </header>
        <div className="flex w-full min-w-0 flex-1 flex-col px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </SidebarInset>
      <BottomNav />
    </>
  );
}
