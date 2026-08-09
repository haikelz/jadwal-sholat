import { DetailHadithPage } from "@/components/hadith/detail-hadith-page";
import { TransitionLayout } from "@/components/transition-layout";
import { env } from "@/env.mjs";
import { getData } from "@/lib/utils/axios-config";
import { cn } from "@/lib/utils/cn";
import { createPageMetadata } from "@/lib/utils/metadata";
import { Metadata } from "next";

const { NEXT_PUBLIC_HADITH_API } = env;

function buildHadithDetailUrl(book: string, hadithNumber: string): string {
  return `${NEXT_PUBLIC_HADITH_API}/books/${book}/${hadithNumber}`;
}

export async function generateMetadata(props: {
  params: Promise<{ book: string; number: string }>;
}): Promise<Metadata | undefined> {
  const { book, number } = await props.params;
  try {
    const url = buildHadithDetailUrl(book, number);
    const data = await getData<{
      data?: { contents?: { id?: string; number?: number } };
    }>(url);
    const contents = data?.data?.contents;
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

  return (
    <TransitionLayout
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "flex w-full max-w-full",
        "flex-col items-center justify-start",
        "pt-8 pb-24 md:pb-8"
      )}
    >
      <DetailHadithPage book={book} hadithNumber={number} />
    </TransitionLayout>
  );
}
