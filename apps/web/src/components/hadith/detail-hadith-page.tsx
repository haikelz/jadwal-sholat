import { NotFound } from "@/components/common/not-found";
import { PageHeader } from "@/components/common/page-shell";
import { ShareButton } from "@/components/common/share-button";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/reui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { HadithDetailResponse } from "@/interfaces";
import { FetchError, getData } from "@/lib/utils/get-data";
import {
  breadcrumbJsonLd,
  SITE_NAME,
  SITE_URL,
  toDescription,
} from "@/lib/utils/metadata";
import { env } from "@/lib/utils/public-env";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";

const { HADITH_API } = env;

type HadithRoute = { book: string; hadithNumber: string };

/**
 * /hadith/<book>/<n>, read from the address bar: Cloudflare Pages serves
 * every hadith URL from the one static /hadith-detail page. Book ids are
 * slugs ("ibnu-majah") and numbers start at 1.
 */
function parseHadithPath(pathname: string): HadithRoute | null {
  const [, section, book, hadithNumber, ...rest] = pathname.split("/");
  if (section !== "hadith" || rest.some(Boolean)) return null;
  if (!/^[a-z-]+$/.test(book ?? "") || !/^[1-9]\d*$/.test(hadithNumber ?? ""))
    return null;
  return { book, hadithNumber };
}

function isMissing(error: unknown) {
  return error instanceof FetchError && error.status === 404;
}

function setMeta(selector: string, attribute: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attribute, value);
}

/** The shell leaves these out (BaseLayout noCanonical), so add them once. */
function setTag(tag: "link" | "meta", key: [string, string], attribute: string, value: string) {
  let element = document.head.querySelector(`${tag}[${key[0]}="${key[1]}"]`);
  if (!element) {
    element = document.createElement(tag);
    element.setAttribute(key[0], key[1]);
    document.head.append(element);
  }
  element.setAttribute(attribute, value);
}

/**
 * The static shell's <head> describes a generic hadith page; once the hadith
 * loads, title, description, canonical, social tags and the breadcrumb
 * describe the real one.
 */
function describeHadith(title: string, translation: string, path: string) {
  const fullTitle = `${title}: Arab dan Terjemahan | ${SITE_NAME}`;
  const description = toDescription(translation);
  const url = new URL(path, SITE_URL).toString();

  document.title = fullTitle;
  setMeta('meta[name="description"]', "content", description);
  setTag("link", ["rel", "canonical"], "href", url);
  setTag("meta", ["property", "og:url"], "content", url);
  setMeta('meta[property="og:title"]', "content", fullTitle);
  setMeta('meta[property="og:description"]', "content", description);
  setMeta('meta[name="twitter:title"]', "content", fullTitle);
  setMeta('meta[name="twitter:description"]', "content", description);

  const breadcrumb = JSON.stringify(
    breadcrumbJsonLd([
      { name: "Hadith", path: "/hadith" },
      { name: title, path },
    ]),
  ).replace(/</g, "\\u003c");
  let script = document.getElementById("hadith-breadcrumb");
  if (!script) {
    script = document.createElement("script");
    script.id = "hadith-breadcrumb";
    script.setAttribute("type", "application/ld+json");
    document.head.append(script);
  }
  script.textContent = breadcrumb;
}

function buildHadithDetailUrl(book: string, hadithNumber: string): string {
  return `${HADITH_API}/books/${book}/${hadithNumber}`;
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

/** The page behind every /hadith/<book>/<n> URL. */
export function HadithDetailRoute() {
  // undefined until the effect has read the address bar: the build renders
  // this island without one, so the first paint is the skeleton.
  const [route, setRoute] = useState<HadithRoute | null>();

  useEffect(() => setRoute(parseHadithPath(window.location.pathname)), []);

  if (route === undefined) return <DetailHadithSkeleton />;
  if (route === null) return <NotFound />;
  return <DetailHadithPage {...route} />;
}

function DetailHadithPage({ book, hadithNumber }: HadithRoute) {
  const apiUrl = buildHadithDetailUrl(book, hadithNumber);
  const { data, error, isPending, isError, isRefetching, refetch } = useQuery({
    queryKey: [apiUrl],
    queryFn: () => getData<HadithDetailResponse>(apiUrl),
    // A missing hadith stays missing; retry only network and server errors.
    retry: (failureCount, retryError) =>
      !isMissing(retryError) && failureCount < 3,
  });

  const contents = data?.data?.contents;
  const bookMeta = data?.data;

  const rawNum = parseInt(hadithNumber, 10);
  const currentNum = (Number.isNaN(rawNum) ? contents?.number : rawNum) ?? 1;
  const totalAvailable = bookMeta?.available ?? 0;
  const canGoPrev = currentNum > 1;
  const canGoNext = totalAvailable > 0 && currentNum < totalAvailable;

  const title = `${bookMeta?.name ?? book} No. ${hadithNumber}`;
  useEffect(() => {
    if (contents)
      describeHadith(title, contents.id, `/hadith/${book}/${hadithNumber}`);
  }, [book, contents, hadithNumber, title]);

  if (isPending || isRefetching) return <DetailHadithSkeleton />;

  if (isMissing(error)) return <NotFound />;

  if (isError || !contents)
    return (
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
    );

  return (
    <article className="flex w-full min-w-0 flex-col gap-6">
      <PageHeader
        align="center"
        title={`Hadith no. ${contents.number}`}
        description={bookMeta?.name ?? book}
        actions={
          <>
            {canGoPrev ? (
              <Button asChild variant="outline">
                <a href={`/hadith/${book}/${currentNum - 1}`}>
                  <ChevronLeft aria-hidden="true" data-icon="inline-start" />
                  Sebelumnya
                </a>
              </Button>
            ) : null}
            <ShareButton
              path={`/hadith/${book}/${contents.number}`}
              title={`${bookMeta?.name ?? book} no. ${contents.number}`}
              excerpt={contents.id}
            />
            {canGoNext ? (
              <Button asChild variant="outline">
                <a href={`/hadith/${book}/${currentNum + 1}`}>
                  Berikutnya
                  <ChevronRight aria-hidden="true" data-icon="inline-end" />
                </a>
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
              className="arabic-font min-w-0 text-right wrap-anywhere [--arabic-leading:2.25] [--arabic-size:1.5rem] sm:[--arabic-size:1.875rem]"
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
            <p className="text-sm leading-[1.75] wrap-anywhere">
              {contents.id.slice(0, 1).toUpperCase() + contents.id.slice(1)}
            </p>
          </section>
        ) : null}
      </div>
    </article>
  );
}
