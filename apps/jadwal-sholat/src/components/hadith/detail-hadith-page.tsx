"use client";

import { ErrorWhileFetch } from "@/components/react-query/error-while-fetch";
import { IsRefetching } from "@/components/react-query/is-refetching";
import { LoadingClient } from "@/components/react-query/loading-client";
import { env } from "@/env.mjs";
import { useFetch } from "@/hooks";
import { HadithDetailResponse } from "@/interfaces";
import { cn } from "@/lib/utils/cn";

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

  if (isPending) return <LoadingClient />;
  if (isError) return <ErrorWhileFetch />;
  if (isRefetching) return <IsRefetching />;
  if (!contents) return <ErrorWhileFetch />;

  return (
    <div className="flex flex-col w-full space-y-4 sm:space-y-6 max-w-full mx-auto">
      <div className="text-center pb-4 border-b">
        <p className="text-xs sm:text-sm font-medium text-muted-foreground">
          {bookMeta?.name ?? book}
        </p>
        <h1 className="text-xl sm:text-2xl font-bold mt-1">
          Hadith No. {contents.number}
        </h1>
      </div>
      {contents.arab && (
        <div className="rounded-lg bg-muted/50 p-4 sm:p-6 overflow-x-auto">
          <p
            className={cn(
              "text-right arabic-font text-xl sm:text-2xl md:text-3xl tracking-wide font-medium leading-loose wrap-break-word"
            )}
          >
            {contents.arab}
          </p>
        </div>
      )}
      {contents.id && (
        <div className="rounded-lg border p-4 sm:p-6">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">
            Terjemahan
          </p>
          <p className="text-sm sm:text-base leading-relaxed wrap-break-word">
            {contents.id.slice(0, 1).toUpperCase() + contents.id.slice(1)}
          </p>
        </div>
      )}
    </div>
  );
}
