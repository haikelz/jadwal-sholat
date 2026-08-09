import { DoaHarianPage } from "@/components/doa-harian/doa-harian-page";
import { TransitionLayout } from "@/components/transition-layout";
import { env } from "@/env.mjs";
import { DoaHarianProps } from "@/interfaces";
import { getData } from "@/lib/utils/axios-config";
import { cn } from "@/lib/utils/cn";
import { createPageMetadata } from "@/lib/utils/metadata";
import Image from "next/image";
import { Suspense } from "react";

const { NEXT_PUBLIC_DOA_HARIAN_API } = env;

export const metadata = createPageMetadata({
  title: "Doa Harian",
  description: "Baca kumpulan doa harian lengkap dengan tulisan Arab dan arti.",
  path: "/doa-harian",
});

async function getDoaHarian(): Promise<DoaHarianProps[]> {
  try {
    const response: DoaHarianProps[] = await getData(
      NEXT_PUBLIC_DOA_HARIAN_API
    );

    return response;
  } catch (err: any) {
    throw new Error("Failed to fetch data!");
  }
}

export default async function DoaHarian() {
  const doaHarian = await getDoaHarian();

  return (
    <TransitionLayout
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "flex w-full max-w-full",
        "flex-col items-center justify-start",
        "space-y-7 pt-8 pb-24 md:pb-8"
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <h1 className={cn("text-3xl font-bold tracking-wide sm:text-4xl")}>
            Do&#39;a Harian
          </h1>
          <Image
            src="/img/pray.svg"
            width={40}
            height={40}
            alt=""
            fetchPriority="high"
            draggable={false}
          />
        </div>
        <p data-cy="description" className="mt-2 text-lg font-medium">
          Berikut daftar do&#39;a harian yang tersedia
        </p>
      </div>
      <Suspense>
        <DoaHarianPage doaHarian={doaHarian} />
      </Suspense>
    </TransitionLayout>
  );
}
