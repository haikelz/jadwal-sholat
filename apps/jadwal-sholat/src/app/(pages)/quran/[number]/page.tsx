import { DetailSuratPage } from "@/components/quran/detail-surat/detail-surat-page";
import { TransitionLayout } from "@/components/transition-layout";
import { env } from "@/env.mjs";
import { ListSuratProps, SuratProps } from "@/interfaces";
import { getData } from "@/lib/utils/axios-config";
import { cn } from "@/lib/utils/cn";
import { createPageMetadata } from "@/lib/utils/metadata";
import { Metadata } from "next";

const { NEXT_PUBLIC_QURAN_API } = env;

export async function generateStaticParams(): Promise<{ number: string }[]> {
  const response: ListSuratProps = await getData(
    `${NEXT_PUBLIC_QURAN_API}/quran`
  );

  return response.data.map((item) => ({ number: item.number.toString() }));
}

export async function generateMetadata(props: {
  params: Promise<{ number: string }>;
}): Promise<Metadata | undefined> {
  const { number } = await props.params;

  const response: SuratProps = await getData(
    `${NEXT_PUBLIC_QURAN_API}/quran/${number}`
  );

  const { asma, tafsir } = response.data;

  const description = tafsir.id.replace(/\s+/g, " ").trim().slice(0, 155);

  return createPageMetadata({
    title: `Surat ${asma.id.short}`,
    description,
    path: `/quran/${number}`,
  });
}

export default async function Surat(props: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await props.params;

  return (
    <>
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
        <DetailSuratPage number={number} />
      </TransitionLayout>
    </>
  );
}
