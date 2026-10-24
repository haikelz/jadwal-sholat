import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

export function PageShell({
  children,
  className,
  width = "wide",
}: {
  children: ReactNode;
  className?: string;
  /**
   * "wide" (default) is the site width shared with the top bar, so page
   * edges line up everywhere. "reading" is a narrower centered column for
   * long text on detail pages (a surah, a hadith).
   */
  width?: "wide" | "reading";
}) {
  return (
    <div
      className={cn(
        // pb-24 below md leaves room for the fixed bottom navigation.
        "mx-auto flex w-full min-w-0 flex-col gap-6 pt-6 pb-24 md:pb-12 lg:pt-8",
        width === "reading" ? "max-w-3xl" : "max-w-5xl",
        // CSS entrance instead of a motion library; globals.css shortens it
        // for prefers-reduced-motion.
        "animate-in fade-in slide-in-from-bottom-1.5 duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
  align = "start",
}: {
  title: string;
  description: ReactNode;
  actions?: ReactNode;
  /** "center" for detail pages in the reading column. */
  align?: "start" | "center";
}) {
  const centered = align === "center";
  return (
    <header
      className={cn(
        "flex w-full flex-col gap-4",
        centered
          ? "items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between",
      )}
    >
      <div
        className={cn("flex min-w-0 flex-col gap-0.5", centered && "items-center")}
      >
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p data-cy="description" className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {actions ? (
        <div
          className={cn(
            "flex shrink-0 flex-wrap items-center gap-2",
            centered && "justify-center",
          )}
        >
          {actions}
        </div>
      ) : null}
    </header>
  );
}
