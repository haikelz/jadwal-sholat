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

export function NotFound() {
  return (
    <Empty className="min-h-[70vh]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>
          <h1>Halaman tidak ditemukan</h1>
        </EmptyTitle>
        <EmptyDescription>Halaman yang kamu cari tidak ditemukan.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <a href="/">
            <ArrowLeft aria-hidden="true" data-icon="inline-start" />
            Kembali ke jadwal sholat
          </a>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
