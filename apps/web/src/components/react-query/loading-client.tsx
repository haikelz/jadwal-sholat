import { Skeleton } from "@/components/ui/skeleton";

export function LoadingClient({ label = "Memuat data…" }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto flex w-full max-w-4xl flex-col gap-6 py-10"
    >
      <span className="sr-only">{label}</span>
      <div className="flex flex-col items-center gap-3">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-5 w-72 max-w-full" />
      </div>
      <Skeleton className="h-9 w-40 self-center" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <Skeleton key={index} className="h-20" />
        ))}
      </div>
    </div>
  );
}
