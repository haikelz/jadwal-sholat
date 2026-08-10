"use client";

import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center py-12">
      <section className="flex max-w-lg flex-col items-center rounded-2xl border bg-card p-7 text-center shadow-sm sm:p-10">
        <p className="text-sm font-semibold text-muted-foreground">Galat 500</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Halaman belum dapat ditampilkan
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
          Layanan sedang mengalami gangguan. Coba lagi atau kembali ke jadwal
          sholat.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset}>
            <RefreshCw aria-hidden="true" className="size-4" />
            Coba lagi
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <Home aria-hidden="true" className="size-4" />
              Ke jadwal sholat
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
