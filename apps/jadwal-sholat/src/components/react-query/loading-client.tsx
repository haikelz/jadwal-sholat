import { LoaderCircle } from "lucide-react";

export function LoadingClient({ label = "Memuat data…" }: { label?: string }) {
  return (
    <div className="flex min-h-[45vh] w-full items-center justify-center px-4 py-12">
      <div
        role="status"
        aria-live="polite"
        className="flex items-center gap-3 rounded-xl border bg-card px-5 py-4 text-sm font-semibold text-card-foreground shadow-sm"
      >
        <LoaderCircle
          aria-hidden="true"
          className="size-5 animate-spin text-muted-foreground"
        />
        <span>{label}</span>
      </div>
    </div>
  );
}
