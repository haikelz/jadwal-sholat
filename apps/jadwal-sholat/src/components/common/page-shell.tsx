import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

export function PageShell({
  children,
  className,
  width = "wide",
}: {
  children: ReactNode;
  className?: string;
  /**
   * "wide" for glance pages (schedules, tables); "reading" for a centered
   * column of comfortable line length (Qur'an, hadith, Asma'ul Husna).
   */
  width?: "wide" | "reading";
}) {
  return (
    <div
      className={cn(
        // pb-24 below md leaves room for the fixed bottom navigation.
        "mx-auto flex w-full min-w-0 flex-col gap-6 pt-6 pb-24 md:pb-12 lg:pt-8",
        width === "reading" ? "max-w-3xl" : "max-w-7xl",
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
}: {
  title: string;
  description: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex min-w-0 flex-col gap-0.5">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p data-cy="description" className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {actions ? (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      ) : null}
    </header>
  );
}
