"use client";

import { SearchBar } from "@/components/common/search-bar";
import { ErrorWhileFetch } from "@/components/react-query/error-while-fetch";
import { LoadingClient } from "@/components/react-query/loading-client";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { env } from "@/env.mjs";
import { useFetch } from "@/hooks";
import { HadithBook, HadithProps, HadithRangeResponse } from "@/interfaces";
import { getData } from "@/lib/utils/axios-config";
import { cn } from "@/lib/utils/cn";
import { getHadithSearchType } from "@/lib/utils/hadith-utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useMemo, useRef } from "react";

const { NEXT_PUBLIC_HADITH_API } = env;
const PER_PAGE = 25;

function buildHadithApiUrl(bookId: string, page: number): string {
  const from = (page - 1) * PER_PAGE + 1;
  const to = page * PER_PAGE;
  return `${NEXT_PUBLIC_HADITH_API}/books/${bookId}?range=${from}-${to}`;
}

function buildBooksUrl(): string {
  return `${NEXT_PUBLIC_HADITH_API}/books`;
}

export function HadithPage() {
  const [search, setSearch] = useQueryState("search");
  const [book, setBook] = useQueryState("book", { defaultValue: "bukhari" });
  const sentinelRef = useRef<HTMLDivElement>(null);

  const booksUrl = buildBooksUrl();
  const { data: booksData } = useFetch(booksUrl);

  const {
    data: hadithData,
    isPending,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["hadiths", book],
    queryFn: async ({ pageParam }) => {
      const res = await getData<HadithRangeResponse>(
        buildHadithApiUrl(book!, pageParam)
      );
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const data = lastPage?.data;
      if (!data?.hadiths?.length) return undefined;
      const totalAvailable = data.available ?? 0;
      const totalPages = Math.ceil(totalAvailable / PER_PAGE);
      const currentPage = allPages.length;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!book,
  });

  const books = useMemo((): HadithBook[] => {
    if (!booksData?.data) return [];
    return Array.isArray(booksData.data) ? booksData.data : [];
  }, [booksData]);

  const hadiths = useMemo((): HadithProps[] => {
    const pages = hadithData?.pages ?? [];
    return pages.flatMap((p) => p?.data?.hadiths ?? []);
  }, [hadithData]);

  const bookMeta = hadithData?.pages?.[0]?.data;

  const filteredHadiths = useMemo(() => {
    const q = search?.trim().toLowerCase();
    if (!q) return hadiths;
    const type = getHadithSearchType(search || "");
    return hadiths.filter((h) => {
      if (type === "number") return String(h.number).includes(q);
      if (type === "arabic") return h.arab.toLowerCase().includes(q);
      return h.id.toLowerCase().includes(q);
    });
  }, [hadiths, search]);

  const searchTypeLabel = useMemo(() => {
    if (!search?.trim()) return null;
    const type = getHadithSearchType(search);
    if (type === "number") return "No. Hadith";
    if (type === "arabic") return "Arab";
    return "Indonesia";
  }, [search]);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    });
    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);
    return () => (sentinel ? observer.unobserve(sentinel) : undefined);
  }, [handleIntersect, filteredHadiths.length]);

  if ((!books.length && !booksData) || (isPending && book))
    return <LoadingClient />;
  if (isError) return <ErrorWhileFetch />;

  return (
    <>
      <div className={cn("flex flex-col items-center justify-center")}>
        <div className="flex justify-center items-center gap-4">
          <SearchBar setSearch={setSearch} name="search" />
          <Select value={book ?? "bukhari"} onValueChange={setBook}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Pilih Kitab" />
            </SelectTrigger>
            <SelectContent>
              {books.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {filteredHadiths.length ? (
        <>
          <div
            className={cn(
              "grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-7"
            )}
          >
            {filteredHadiths.map((h) => (
              <Link
                key={`${book}-${h.number}`}
                href={`/hadith/${book}/${h.number}`}
              >
                <Card
                  data-cy="card"
                  className="h-full hover:bg-muted/50 transition-colors"
                >
                  <CardHeader className="py-4">
                    <h3 className="text-base font-bold text-center">
                      {bookMeta?.name} No. {h.number}
                    </h3>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          <div
            ref={sentinelRef}
            className="h-10 flex items-center justify-center"
          >
            {isFetchingNextPage && (
              <p className="text-sm text-muted-foreground font-bold">
                Memuat...
              </p>
            )}
          </div>
        </>
      ) : (
        <p data-cy="not-found-text" className="text-lg font-medium">
          Hadith tidak ditemukan.
        </p>
      )}
    </>
  );
}
