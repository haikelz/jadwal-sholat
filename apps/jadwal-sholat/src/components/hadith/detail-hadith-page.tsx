"use client";

import { PageHeader } from "@/components/common/page-shell";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/reui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { env } from "@/lib/utils/public-env";
import { useFetch } from "@/hooks";
import { HadithDetailResponse } from "@/interfaces";
import { ChevronLeft, ChevronRight, CircleAlert } from "lucide-react";
import Link from "next/link";

const { NEXT_PUBLIC_HADITH_API } = env;

function buildHadithDetailUrl(book: string, hadithNumber: string): string {
  return `${NEXT_PUBLIC_HADITH_API}/books/${book}/${hadithNumber}`;
}

function DetailHadithSkeleton() {
  return (
    <div
      role="status"
      aria-label="Memuat hadith"
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-end gap-3">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-4/5" />
          <Skeleton className="h-8 w-3/5" />
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}

export function DetailHadithPage({
  book,
  hadithNumber,
  initialData,
}: {
  book: string;
  hadithNumber: string;
  initialData?: HadithDetailResponse;
}) {
  const apiUrl = buildHadithDetailUrl(book, hadithNumber);
  const { data, isPending, isError, isRefetching, refetch } =
    useFetch<HadithDetailResponse>(apiUrl, initialData);

  const contents = data?.data?.contents;
  const bookMeta = data?.data;

  const rawNum = parseInt(hadithNumber, 10);
  const currentNum = (Number.isNaN(rawNum) ? contents?.number : rawNum) ?? 1;
  const totalAvailable = bookMeta?.available ?? 0;
  const canGoPrev = currentNum > 1;
  const canGoNext = totalAvailable > 0 && currentNum < totalAvailable;

  if (isPending || isRefetching) return <DetailHadithSkeleton />;

  if (isError || !contents)
    return (
      <Alert variant="destructive">
        <CircleAlert aria-hidden="true" />
        <AlertTitle>Hadith belum dapat dimuat</AlertTitle>
        <AlertDescription>
          Periksa koneksi internet, lalu coba lagi.
        </AlertDescription>
        <AlertAction>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Coba lagi
          </Button>
        </AlertAction>
      </Alert>
    );

  return (
    <article className="flex w-full min-w-0 flex-col gap-6">
      <PageHeader
        title={`Hadith no. ${contents.number}`}
        description={bookMeta?.name ?? book}
        actions={
          <>
            {canGoPrev ? (
              <Button asChild variant="outline">
                <Link href={`/hadith/${book}/${currentNum - 1}`}>
                  <ChevronLeft aria-hidden="true" data-icon="inline-start" />
                  Sebelumnya
                </Link>
              </Button>
            ) : null}
            {canGoNext ? (
              <Button asChild variant="outline">
                <Link href={`/hadith/${book}/${currentNum + 1}`}>
                  Berikutnya
                  <ChevronRight aria-hidden="true" data-icon="inline-end" />
                </Link>
              </Button>
            ) : null}
          </>
        }
      />
      {/* A reading surface: text in the centered column, no panel chrome. */}
      <div className="flex flex-col gap-6">
        {contents.arab ? (
          <section className="flex flex-col gap-2">
            <h2 className="sr-only">Teks Arab</h2>
            <p
              lang="ar"
              dir="rtl"
              className="arabic-font min-w-0 text-right text-2xl wrap-anywhere sm:text-3xl"
            >
              {contents.arab}
            </p>
          </section>
        ) : null}
        {contents.arab && contents.id ? <Separator /> : null}
        {contents.id ? (
          <section className="flex flex-col gap-2">
            <h2 className="text-xs font-medium text-muted-foreground">
              Terjemahan
            </h2>
            <p className="text-sm wrap-anywhere">
              {contents.id.slice(0, 1).toUpperCase() + contents.id.slice(1)}
            </p>
          </section>
        ) : null}
      </div>
    </article>
  );
}
