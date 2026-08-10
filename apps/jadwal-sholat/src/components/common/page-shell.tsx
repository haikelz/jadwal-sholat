import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";
import { TransitionLayout } from "../transition-layout";

export function PageShell({
  children,
  className,
  size = "wide",
}: {
  children: ReactNode;
  className?: string;
  size?: "wide" | "reader";
}) {
  return (
    <TransitionLayout
      transition={{ duration: 0.24 }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "mx-auto flex w-full flex-col gap-8 pb-24 pt-7 sm:gap-10 sm:pt-10 md:pb-12 lg:pt-12",
        size === "reader" ? "max-w-5xl" : "max-w-7xl",
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
  icon,
}: {
  title: string;
  description: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <header className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
      <div className="flex items-center justify-center gap-3">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h1>
        {icon ? (
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted sm:size-12">
            {icon}
          </span>
        ) : null}
      </div>
      <p
        data-cy="description"
        className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        {description}
      </p>
    </header>
  );
}
