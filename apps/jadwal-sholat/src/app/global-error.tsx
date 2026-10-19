"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import * as Sentry from "@sentry/nextjs";
import "./globals.css";
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
        <main className="flex min-h-svh px-4">
          <Empty>
            <EmptyHeader>
              <EmptyTitle>
                <h1>Aplikasi belum dapat dibuka</h1>
              </EmptyTitle>
              <EmptyDescription>
                Terjadi gangguan yang tidak terduga. Muat ulang aplikasi untuk
                mencoba kembali.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button type="button" onClick={reset}>
                Muat ulang aplikasi
              </Button>
            </EmptyContent>
          </Empty>
        </main>
      </body>
    </html>
  );
}
