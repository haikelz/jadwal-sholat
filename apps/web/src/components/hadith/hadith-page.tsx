import { SearchBar } from "@/components/common/search-bar";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/reui/alert";
import { Button } from "@/components/ui/button";
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
import { env } from "@/lib/utils/public-env";
import { useFetch } from "@/hooks/use-fetch";
import type {
  HadithBook,
  HadithBooksResponse,
  HadithProps,
  HadithDetailResponse,
  HadithRangeResponse,
} from "@/interfaces";
import { getData } from "@/lib/utils/get-data";
import {
  hadithBooksUrl,
  hadithDetailUrl,
  hadithRangeUrl,
  nextHadithPage,
} from "@jadwal-sholat/core/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { CircleAlert, SearchX } from "lucide-react";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useMemo, useRef } from "react";

const { HADITH_API } = env;

function HadithRowSkeleton() {
  return (
    <li className="flex flex-col gap-2 border-b px-2 py-3">
      <Skeleton className="h-4 w-2/5" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </li>
  );
}

/** Built into /hadith, so crawlers reach hadith pages through links. */
export type HadithListInitialData = {
  books: HadithBooksResponse;
  /** Bukhari, the default book, first page. */
  firstPage: HadithRangeResponse;
};

export function HadithPage({ initialData }: { initialData: HadithListInitialData }) {
  const [search, setSearch] = useQueryState("search");
  const [book, setBook] = useQueryState("book", { defaultValue: "bukhari" });
  const sentinelRef = useRef<HTMLDivElement>(null);

  const booksUrl = hadithBooksUrl(HADITH_API);
  const { data: booksData } = useFetch(booksUrl, initialData.books);

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
      return getData<HadithRangeResponse>(hadithRangeUrl(HADITH_API, book!, pageParam));
    },
    initialPageParam: 1,
    // Hadith text doesn't change, so the built first page stays.
    ...(book === "bukhari"
      ? { initialData: { pages: [initialData.firstPage], pageParams: [1] }, staleTime: Infinity }
      : {}),
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.data?.hadiths?.length
        ? nextHadithPage(lastPage.data.available, allPages.length)
        : undefined,
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
      getData<HadithDetailResponse>(hadithDetailUrl(HADITH_API, book!, searchNum!)),
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
        <ul
          role="status"
          aria-label="Memuat hadith"
          className="grid w-full grid-cols-1 border-t md:grid-cols-2 md:gap-x-8"
        >
          {Array.from({ length: isLoadingList ? 6 : 1 }, (_, index) => (
            <HadithRowSkeleton key={index} />
          ))}
        </ul>
      ) : isError && !isSearchByNumber ? (
        <Alert variant="destructive">
          <CircleAlert aria-hidden="true" />
          <AlertTitle>Hadith belum dapat dimuat</AlertTitle>
          <AlertDescription>
            Periksa koneksi internet, lalu coba lagi.
          </AlertDescription>
          <AlertAction>
            <Button variant="outline" onClick={() => refetch()}>
              Coba lagi
            </Button>
          </AlertAction>
        </Alert>
      ) : displayHadiths.length ? (
        <>
          {/* Plain rows; two columns on wider screens instead of full-width lines. */}
          <ul className="grid w-full grid-cols-1 border-t md:grid-cols-2 md:gap-x-8">
            {displayHadiths.map((h) => (
              <li key={`${book}-${h.number}`} data-cy="card" className="border-b">
                <a
                  href={`/hadith/${book}/${h.number}`}
                  className="flex flex-col gap-1 px-2 py-3 transition-colors outline-none hover:bg-muted/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                >
                  <span className="text-sm font-medium wrap-break-word">
                    {bookName} no. {h.number}
                  </span>
                  <span className="line-clamp-2 text-sm text-muted-foreground">
                    {h.id}
                  </span>
                </a>
              </li>
            ))}
          </ul>
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
