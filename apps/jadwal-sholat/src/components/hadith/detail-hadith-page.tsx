"use client";

import { ErrorWhileFetch } from "@/components/react-query/error-while-fetch";
import { IsRefetching } from "@/components/react-query/is-refetching";
import { LoadingClient } from "@/components/react-query/loading-client";
import { Button } from "@/components/ui/button";
import { env } from "@/env.mjs";
import { useFetch } from "@/hooks";
import { HadithDetailResponse } from "@/interfaces";
import { cn } from "@/lib/utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const { NEXT_PUBLIC_HADITH_API } = env;

function buildHadithDetailUrl(book: string, hadithNumber: string): string {
  return `${NEXT_PUBLIC_HADITH_API}/books/${book}/${hadithNumber}`;
}

export function DetailHadithPage({
  book,
  hadithNumber,
}: {
  book: string;
  hadithNumber: string;
}) {
  const apiUrl = buildHadithDetailUrl(book, hadithNumber);
  const { data, isPending, isError, isRefetching } = useFetch(apiUrl);

  const response = data as HadithDetailResponse | undefined;
  const contents = response?.data?.contents;
  const bookMeta = response?.data;

  const rawNum = parseInt(hadithNumber, 10);
  const currentNum = (Number.isNaN(rawNum) ? contents?.number : rawNum) ?? 1;
  const totalAvailable = bookMeta?.available ?? 0;
  const canGoPrev = currentNum > 1;
  const canGoNext = totalAvailable > 0 && currentNum < totalAvailable;

  if (isPending) return <LoadingClient />;
  if (isError) return <ErrorWhileFetch />;
  if (isRefetching) return <IsRefetching />;
  if (!contents) return <ErrorWhileFetch />;

  return (
    <article className="mx-auto flex w-full max-w-3xl min-w-0 flex-col gap-5 sm:gap-6">
      <header className="grid grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-3 border-b pb-5 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
        <div>
          {canGoPrev ? (
            <Button asChild size="icon" variant="outline">
              <Link
                href={`/hadith/${book}/${currentNum - 1}`}
                aria-label="Hadith sebelumnya"
              >
                <ChevronLeft aria-hidden="true" size={18} />
              </Link>
            </Button>
          ) : null}
        </div>
        <div className="min-w-0 text-center">
          <p className="truncate text-sm font-medium text-muted-foreground">
            {bookMeta?.name ?? book}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Hadith no. {contents.number}
          </h1>
        </div>
        <div className="flex justify-end">
          {canGoNext ? (
            <Button asChild size="icon" variant="outline">
              <Link
                href={`/hadith/${book}/${currentNum + 1}`}
                aria-label="Hadith berikutnya"
              >
                <ChevronRight aria-hidden="true" size={18} />
              </Link>
            </Button>
          ) : null}
        </div>
      </header>
      {contents.arab && (
        <section className="min-w-0 rounded-2xl bg-muted/60 p-5 sm:p-8">
          <h2 className="sr-only">Teks Arab</h2>
          <p
            lang="ar"
            dir="rtl"
            className={cn(
              "arabic-font min-w-0 max-w-full text-right text-2xl font-medium leading-loose sm:text-3xl",
              "[overflow-wrap:anywhere]",
            )}
          >
            {contents.arab}
          </p>
        </section>
      )}
      {contents.id && (
        <section className="rounded-2xl border bg-card p-5 shadow-xs sm:p-8">
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
            Terjemahan
          </h2>
          <p className="max-w-[70ch] text-base leading-7 [overflow-wrap:anywhere]">
            {contents.id.slice(0, 1).toUpperCase() + contents.id.slice(1)}
          </p>
        </section>
      )}
    </article>
  );
}
