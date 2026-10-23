import { JsonLd } from "@/components/common/json-ld";
import { PageShell } from "@/components/common/page-shell";
import { DetailHadithPage } from "@/components/hadith/detail-hadith-page";
import { env } from "@/lib/utils/public-env";
import { FetchError, getData } from "@/lib/utils/get-data";
import {
  breadcrumbJsonLd,
  createPageMetadata,
  toDescription,
} from "@/lib/utils/metadata";
import { HadithDetailResponse } from "@/interfaces";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

const { NEXT_PUBLIC_HADITH_API } = env;

function buildHadithDetailUrl(book: string, hadithNumber: string): string {
  return `${NEXT_PUBLIC_HADITH_API}/books/${book}/${hadithNumber}`;
}

// Book ids are slugs ("ibnu-majah") and numbers start at 1.
function isHadithPath(book: string, hadithNumber: string) {
  return /^[a-z-]+$/.test(book) && /^[1-9]\d*$/.test(hadithNumber);
}

/** "abu-daud" → "HR. Abu Daud", for when the API name isn't available. */
function bookTitle(book: string) {
  return `HR. ${book
    .split("-")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ")}`;
}

// A 404 from the API is a 404 here too; other failures fall back so the
// client can retry.
function isMissing(error: unknown) {
  return error instanceof FetchError && error.status === 404;
}

// One request per hadith, shared by generateMetadata and the page.
const getHadith = cache(
  (book: string, hadithNumber: string): Promise<HadithDetailResponse> =>
    getData(buildHadithDetailUrl(book, hadithNumber)),
);

export async function generateMetadata(props: {
  params: Promise<{ book: string; number: string }>;
}): Promise<Metadata | undefined> {
  const { book, number } = await props.params;
  if (!isHadithPath(book, number)) notFound();

  try {
    const { name, contents } = (await getHadith(book, number)).data;
    return createPageMetadata({
      title: `${name} No. ${number}: Arab dan Terjemahan`,
      description: toDescription(contents.id),
      path: `/hadith/${book}/${number}`,
    });
  } catch (error) {
    if (isMissing(error)) notFound();
    return createPageMetadata({
      title: `${bookTitle(book)} No. ${number}: Arab dan Terjemahan`,
      description: `Baca hadith nomor ${number} dari ${bookTitle(book)} dengan teks Arab dan terjemahan Indonesia.`,
      path: `/hadith/${book}/${number}`,
    });
  }
}

export default async function HadithDetail(props: {
  params: Promise<{ book: string; number: string }>;
}) {
  const { book, number } = await props.params;
  if (!isHadithPath(book, number)) notFound();
  // On other failures the client component fetches again and shows its
  // retry state.
  const hadith = await getHadith(book, number).catch((error: unknown) => {
    if (isMissing(error)) notFound();
    return undefined;
  });
  const title = `${hadith?.data.name ?? bookTitle(book)} No. ${number}`;

  return (
    <PageShell width="reading">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Hadith", path: "/hadith" },
          { name: title, path: `/hadith/${book}/${number}` },
        ])}
      />
      <DetailHadithPage
        book={book}
        hadithNumber={number}
        initialData={hadith}
      />
    </PageShell>
  );
}
