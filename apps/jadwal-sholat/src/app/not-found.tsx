import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center py-12">
      <section className="flex max-w-lg flex-col items-center rounded-2xl border bg-card p-7 text-center shadow-sm sm:p-10">
        <p className="text-sm font-semibold text-muted-foreground">Galat 404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Halaman yang kamu cari tidak ditemukan.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Kembali ke jadwal sholat
          </Link>
        </Button>
      </section>
    </div>
  );
}
