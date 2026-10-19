"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Home, RefreshCw, TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <Empty className="min-h-[70vh]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <TriangleAlert aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>
          <h1>Halaman belum dapat ditampilkan</h1>
        </EmptyTitle>
        <EmptyDescription>
          Layanan sedang mengalami gangguan. Coba lagi atau kembali ke jadwal
          sholat.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="sm:flex-row sm:justify-center">
        <Button type="button" onClick={reset}>
          <RefreshCw aria-hidden="true" data-icon="inline-start" />
          Coba lagi
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            <Home aria-hidden="true" data-icon="inline-start" />
            Ke jadwal sholat
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
