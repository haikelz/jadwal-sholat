import { PageShell } from "@/components/common/page-shell";
import { DetailHadithPage } from "@/components/hadith/detail-hadith-page";
import { env } from "@/lib/utils/public-env";
import { getData } from "@/lib/utils/get-data";
import { createPageMetadata } from "@/lib/utils/metadata";
import { HadithDetailResponse } from "@/interfaces";
import { Metadata } from "next";
import { cache } from "react";

const { NEXT_PUBLIC_HADITH_API } = env;

function buildHadithDetailUrl(book: string, hadithNumber: string): string {
  return `${NEXT_PUBLIC_HADITH_API}/books/${book}/${hadithNumber}`;
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
  try {
    const contents = (await getHadith(book, number))?.data?.contents;
    const title = `HR. ${book
      .split("-")
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(" ")} No. ${number}`;
    return createPageMetadata({
      title,
      description: contents?.id?.slice(0, 155) ?? `Hadith nomor ${number}`,
      path: `/hadith/${book}/${number}`,
    });
  } catch {
    return createPageMetadata({
      title: `Hadith nomor ${number}`,
      description: `Hadith ${number} dari ${book}`,
      path: `/hadith/${book}/${number}`,
    });
  }
}

export default async function HadithDetail(props: {
  params: Promise<{ book: string; number: string }>;
}) {
  const { book, number } = await props.params;
  // On failure the client component fetches again and shows its retry state.
  const hadith = await getHadith(book, number).catch(() => undefined);

  return (
    <PageShell width="reading">
      <DetailHadithPage
        book={book}
        hadithNumber={number}
        initialData={hadith}
      />
    </PageShell>
  );
}
