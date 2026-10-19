"use client";

import { SearchBar } from "@/components/common/search-bar";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/reui/alert";
import { Button } from "@/components/ui/button";
import {
  Frame,
  FrameDescription,
  FramePanel,
  FrameTitle,
} from "@/components/reui/frame";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { env } from "@/env.mjs";
import { useFetch } from "@/hooks";
import {
  HadithBook,
  HadithProps,
  HadithDetailResponse,
  HadithRangeResponse,
} from "@/interfaces";
import { getData } from "@/lib/utils/axios-config";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { CircleAlert, SearchX } from "lucide-react";
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

function HadithCardSkeleton() {
  return (
    <Frame variant="ghost">
      <FramePanel className="flex flex-col gap-2">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </FramePanel>
    </Frame>
  );
}

export function HadithPage() {
  const [search, setSearch] = useQueryState("search");
  const [book, setBook] = useQueryState("book", { defaultValue: "bukhari" });
  const sentinelRef = useRef<HTMLDivElement>(null);

  const booksUrl = buildBooksUrl();
  const { data: booksData } = useFetch(booksUrl);

  const books = useMemo((): HadithBook[] => {
    if (!booksData?.data) return [];
    return Array.isArray(booksData.data) ? booksData.data : [];
  }, [booksData]);

  const searchNum = useMemo(() => {
    const n = parseInt(search ?? "", 10);
    return Number.isNaN(n) ? null : n;
  }, [search]);

  const isSearchByNumber = searchNum !== null;
  const currentBookMeta = useMemo(
    () => books.find((b) => b.id === book),
    [books, book],
  );
  const totalAvailable = currentBookMeta?.available ?? 0;

  const {
    data: hadithData,
    isPending,
    isError,
    refetch,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["hadiths", book],
    queryFn: async ({ pageParam }) => {
      const res = await getData<HadithRangeResponse>(
        buildHadithApiUrl(book!, pageParam),
      );
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const data = lastPage?.data;
      if (!data?.hadiths?.length) return undefined;
      const avail = data.available ?? 0;
      const totalPages = Math.ceil(avail / PER_PAGE);
      const currentPage = allPages.length;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!book && !isSearchByNumber,
  });

  const hadiths = useMemo((): HadithProps[] => {
    const pages = hadithData?.pages ?? [];
    return pages.flatMap((p) => p?.data?.hadiths ?? []);
  }, [hadithData]);

  const filteredHadiths = useMemo(() => {
    const q = search?.trim();
    if (!q) return hadiths;
    return hadiths.filter((h) => String(h.number).includes(q));
  }, [hadiths, search]);

  const shouldFetchSingle =
    !!book &&
    searchNum !== null &&
    searchNum >= 1 &&
    totalAvailable >= searchNum;

  const { data: singleHadithRes, isFetching: isFetchingSingle } = useQuery({
    queryKey: ["hadith-single", book, searchNum],
    queryFn: () =>
      getData<HadithDetailResponse>(buildHadithSingleUrl(book!, searchNum!)),
    enabled: !!shouldFetchSingle,
  });

  const singleHadithAsCard = useMemo((): HadithProps | null => {
    if (!shouldFetchSingle || !singleHadithRes?.data?.contents) return null;
    const c = singleHadithRes.data.contents;
    return { number: c.number, arab: c.arab, id: c.id };
  }, [shouldFetchSingle, singleHadithRes]);

  const displayHadiths = useMemo(() => {
    if (isSearchByNumber && singleHadithAsCard) return [singleHadithAsCard];
    return filteredHadiths;
  }, [filteredHadiths, singleHadithAsCard, isSearchByNumber]);

  const bookName =
    currentBookMeta?.name ?? hadithData?.pages?.[0]?.data?.name ?? book;
  const showSentinel = !isSearchByNumber;

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    if (!showSentinel) return;
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    });
    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);
    return () => (sentinel ? observer.unobserve(sentinel) : undefined);
  }, [handleIntersect, showSentinel]);

  const isLoadingList =
    (!books.length && !booksData) || (isPending && book && !isSearchByNumber);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          value={search}
          setSearch={setSearch}
          name="search"
          placeholder="Cari nomor hadith"
        />
        <Select value={book ?? "bukhari"} onValueChange={setBook}>
          <SelectTrigger aria-label="Pilih kitab" className="w-full sm:w-60">
            <SelectValue placeholder="Pilih kitab" />
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
      {isLoadingList || (shouldFetchSingle && isFetchingSingle) ? (
        <div
          role="status"
          aria-label="Memuat hadith"
          className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {Array.from({ length: isLoadingList ? 6 : 1 }, (_, index) => (
            <HadithCardSkeleton key={index} />
          ))}
        </div>
      ) : isError && !isSearchByNumber ? (
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
      ) : displayHadiths.length ? (
        <>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {displayHadiths.map((h) => (
              <Frame
                key={`${book}-${h.number}`}
                variant="ghost"
                data-cy="card"
                className="group relative has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring"
              >
                <FramePanel className="flex flex-col gap-1 transition-colors group-hover:bg-muted/50">
                  <FrameTitle className="wrap-break-word">
                    <Link
                      href={`/hadith/${book}/${h.number}`}
                      className="outline-none after:absolute after:inset-0"
                    >
                      {bookName} no. {h.number}
                    </Link>
                  </FrameTitle>
                  <FrameDescription className="line-clamp-2">
                    {h.id}
                  </FrameDescription>
                </FramePanel>
              </Frame>
            ))}
          </div>
          {showSentinel && (
            <div
              ref={sentinelRef}
              className="flex min-h-16 items-center justify-center"
            >
              {isFetchingNextPage && (
                <p
                  role="status"
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Spinner aria-hidden="true" role={undefined} />
                  Memuat hadith berikutnya…
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchX aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle data-cy="not-found-text">
              Hadith tidak ditemukan.
            </EmptyTitle>
            <EmptyDescription>
              {totalAvailable
                ? `Kitab ini memuat ${totalAvailable} hadith. Coba nomor lain.`
                : "Coba nomor lain atau pilih kitab lain."}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" onClick={() => setSearch(null)}>
              Hapus pencarian
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
}
