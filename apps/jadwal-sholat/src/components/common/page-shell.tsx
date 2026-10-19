import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";
import { TransitionLayout } from "../transition-layout";

export function PageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <TransitionLayout
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "mx-auto flex w-full min-w-0 flex-col gap-6 pt-6 pb-24 md:pb-12 lg:pt-8",
        "max-w-7xl",
        className,
      )}
    >
      {children}
    </TransitionLayout>
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
