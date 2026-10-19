import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowLeft, SearchX } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <Empty className="min-h-[70vh]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>
          <h1>Halaman tidak ditemukan</h1>
        </EmptyTitle>
        <EmptyDescription>
          Halaman yang kamu cari tidak ditemukan.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link href="/">
            <ArrowLeft aria-hidden="true" data-icon="inline-start" />
            Kembali ke jadwal sholat
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
