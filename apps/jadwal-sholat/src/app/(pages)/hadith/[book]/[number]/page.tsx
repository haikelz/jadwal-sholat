import { DetailHadithPage } from "@/components/hadith/detail-hadith-page";
import { TransitionLayout } from "@/components/transition-layout";
import { env } from "@/env.mjs";
import { getData } from "@/lib/utils/axios-config";
import { cn } from "@/lib/utils/cn";
import { MetaUrl } from "@/lib/utils/enums";
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
    const base = {
      title: title,
      description: contents?.id?.slice(0, 160) ?? `Hadith ${number}`,
      url: `${MetaUrl.Site_Url}/hadith/${book}/${number}`,
    };
    return {
      title: base.title,
      description: base.description,
      openGraph: {
        type: "website",
        url: base.url,
        title: base.title,
        description: base.description,
        images: [{ url: MetaUrl.Default_Og_Url, alt: "OG Image" }],
        siteName: `jdwshlt.ekel.dev/hadith/${book}/${number}`,
      },
      twitter: {
        title: base.title,
        description: base.description,
        site: base.url,
        card: "summary_large_image",
      },
      metadataBase: new URL(base.url),
    };
  } catch {
    return {
      title: `Hadith #${number} | Jadwal Sholat`,
      description: `Hadith ${number} dari ${book}`,
    };
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
