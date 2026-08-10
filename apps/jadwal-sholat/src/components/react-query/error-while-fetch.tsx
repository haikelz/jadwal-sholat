"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw, WifiOff } from "lucide-react";

export function ErrorWhileFetch() {
  return (
    <div className="flex min-h-[45vh] w-full items-center justify-center px-4 py-12">
      <div
        role="alert"
        className="flex max-w-md flex-col items-center rounded-2xl border bg-card p-6 text-center shadow-sm sm:p-8"
      >
        <span className="flex size-12 items-center justify-center rounded-xl bg-muted">
          <WifiOff
            aria-hidden="true"
            className="size-6 text-muted-foreground"
          />
        </span>
        <h2 className="mt-5 text-xl font-bold tracking-tight">
          Data belum dapat dimuat
        </h2>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          Periksa koneksi internet, lalu coba muat kembali halaman ini.
        </p>
        <Button className="mt-5" onClick={() => window.location.reload()}>
          <RefreshCw aria-hidden="true" className="size-4" />
          Muat ulang
        </Button>
      </div>
    </div>
  );
}
