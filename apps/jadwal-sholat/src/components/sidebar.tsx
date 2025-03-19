"use client";

import { ChildrenProps } from "@/interfaces";
import { slugify } from "@/lib/helpers";
import { cn } from "@/lib/utils/cn";
import { Separator } from "@radix-ui/react-separator";
import {
  BookMarked,
  Clock4,
  HandHelping,
  List,
  LucideIcon,
  Menu,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Button } from "./ui/button";
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
  useSidebar,
} from "./ui/sidebar";

const SwitchTheme = dynamic(() => import("@/components/switch-theme"), {
  ssr: false,
});

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
  { id: 3, title: "Do'a Harian", icon: HandHelping, url: "/doa-harian" },
];

export function CustomSidebar({ children }: ChildrenProps) {
  const pathname = usePathname();
  const routeSegments = pathname.slice(1).split("/").filter(Boolean);

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
    <>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent className="dark:bg-gray-900 bg-gray-50">
            <SidebarGroup>
              <SidebarGroupLabel>jdwshlt.ekel.dev</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "hover:bg-gray-100 dark:hover:bg-gray-800 font-medium",
                        pathname === "/"
                          ? "bg-gray-100 dark:bg-gray-800 font-bold"
                          : null
                      )}
                    >
                      <Link href="/">
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
                          className={cn(
                            "hover:bg-gray-100 dark:hover:bg-gray-800 font-medium",
                            pathname.includes(item.url)
                              ? "bg-gray-100 dark:bg-gray-800 font-bold"
                              : null
                          )}
                        >
                          <Link href={slugify(item.title)}>
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
          <SidebarFooter className="dark:bg-gray-900 bg-gray-50 flex items-end justify-center">
            <SwitchTheme />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 sticky top-0 z-50 dark:bg-gray-950/70 bg-white/70 backdrop-blur-md items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <CustomTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {routesList.map((item, index) => (
                    <Fragment key={index + 1}>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={item.url}>
                          {item.title}
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
          </header>
          <main className="flex w-full justify-center min-h-svh">
            <section
              className={cn(
                "flex w-full max-w-full flex-col items-center min-h-screen",
                "bg-white px-5 text-center",
                "dark:bg-gray-950"
              )}
            >
              {children}
            </section>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

function CustomTrigger() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button
      className={cn("rounded-full")}
      size="icon"
      onClick={toggleSidebar}
      variant="outline"
    >
      {open ? <X /> : <Menu />}
    </Button>
  );
}
