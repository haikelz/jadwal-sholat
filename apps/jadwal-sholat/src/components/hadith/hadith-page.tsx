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
import {
  HadithBook,
  HadithProps,
  HadithDetailResponse,
  HadithRangeResponse,
} from "@/interfaces";
import { getData } from "@/lib/utils/axios-config";
import { cn } from "@/lib/utils/cn";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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

function buildHadithSingleUrl(bookId: string, number: number): string {
  return `${NEXT_PUBLIC_HADITH_API}/books/${bookId}/${number}`;
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
    const q = search?.trim();
    if (!q) return hadiths;
    return hadiths.filter((h) => String(h.number).includes(q));
  }, [hadiths, search]);

  const searchNum = useMemo(() => {
    const n = parseInt(search ?? "", 10);
    return Number.isNaN(n) ? null : n;
  }, [search]);

  const shouldFetchSingle =
    !!book &&
    searchNum !== null &&
    searchNum >= 1 &&
    filteredHadiths.length === 0 &&
    (bookMeta?.available ?? 0) >= searchNum;

  const { data: singleHadithRes, isFetching: isFetchingSingle } = useQuery({
    queryKey: ["hadith-single", book, searchNum],
    queryFn: () =>
      getData<HadithDetailResponse>(
        buildHadithSingleUrl(book!, searchNum!)
      ),
    enabled: !!shouldFetchSingle,
  });

  const singleHadithAsCard = useMemo((): HadithProps | null => {
    if (!shouldFetchSingle || !singleHadithRes?.data?.contents) return null;
    const c = singleHadithRes.data.contents;
    return { number: c.number, arab: c.arab, id: c.id };
  }, [shouldFetchSingle, singleHadithRes]);

  const displayHadiths = useMemo(() => {
    if (singleHadithAsCard && filteredHadiths.length === 0)
      return [singleHadithAsCard];
    return filteredHadiths;
  }, [filteredHadiths, singleHadithAsCard]);

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
  }, [handleIntersect, displayHadiths.length]);

  if ((!books.length && !booksData) || (isPending && book))
    return <LoadingClient />;
  if (isError) return <ErrorWhileFetch />;

  return (
    <>
      <div
        className={cn("flex flex-col items-center justify-center w-full px-4")}
      >
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none">
          <SearchBar
            setSearch={setSearch}
            name="search"
            placeholder="Cari berdasarkan nomor hadith"
          />
          <Select value={book ?? "bukhari"} onValueChange={setBook}>
            <SelectTrigger className="w-full sm:w-[220px]">
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
      {displayHadiths.length ? (
        <>
          <div
            className={cn(
              "grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-7"
            )}
          >
            {displayHadiths.map((h) => (
              <Link
                key={`${book}-${h.number}`}
                href={`/hadith/${book}/${h.number}`}
              >
                <Card
                  data-cy="card"
                  className="h-full hover:bg-muted/50 transition-colors"
                >
                  <CardHeader className="py-3 sm:py-4 px-4">
                    <h3 className="text-sm sm:text-base font-bold text-center wrap-break-word">
                      {bookMeta?.name} No. {h.number}
                    </h3>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          <div
            ref={sentinelRef}
            className="h-10 flex items-center justify-center px-4"
          >
            {isFetchingNextPage && (
              <p className="text-sm text-muted-foreground font-bold">
                Memuat...
              </p>
            )}
          </div>
        </>
      ) : shouldFetchSingle && isFetchingSingle ? (
        <p className="text-lg font-medium px-4 text-center mt-6 text-muted-foreground">
          Memuat...
        </p>
      ) : (
        <p
          data-cy="not-found-text"
          className="text-lg font-medium px-4 text-center mt-6"
        >
          Hadith tidak ditemukan.
        </p>
      )}
    </>
  );
}
