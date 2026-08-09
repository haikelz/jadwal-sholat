import { cn } from "@/lib/utils/cn";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <div
      className={cn(
        "flex w-full max-w-full",
        "flex-col items-center justify-start",
        "space-y-7 py-8"
      )}
    >
      <section className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">404</h1>
        <p className="mt-3 font-medium">
          Halaman yang kamu cari tidak ditemukan.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Kembali ke jadwal sholat
        </Link>
      </section>
    </div>
  );
}
