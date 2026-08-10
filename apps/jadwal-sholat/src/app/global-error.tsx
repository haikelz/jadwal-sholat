"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="id">
      <body className="bg-background text-foreground antialiased">
        <main className="flex min-h-svh items-center justify-center px-4 py-12">
          <section className="flex max-w-lg flex-col items-center rounded-2xl border bg-card p-8 text-center shadow-sm">
            <p className="text-sm font-semibold text-muted-foreground">
              Galat aplikasi
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Aplikasi belum dapat dibuka
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Terjadi gangguan yang tidak terduga. Muat ulang aplikasi untuk
              mencoba kembali.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 min-h-11 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Muat ulang aplikasi
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
