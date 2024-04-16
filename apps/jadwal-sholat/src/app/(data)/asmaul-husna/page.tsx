import TransitionLayout from "~components/layout/transition-layout";
import { env } from "~env.mjs";
import { AsmaulHusnaProps } from "~interfaces";
import { cx } from "~lib/helpers";
import { getData } from "~lib/utils/axios-config";
import { MetaUrl } from "~lib/utils/enums";
import { bitter } from "~lib/utils/fonts";

import { AsmaulHusnaClient } from "./client";

const { NEXT_PUBLIC_ASMAUL_HUSNA_API } = env;

const baseMetadata = {
  title: "Asma'ul Husna | Jadwal Sholat",
  description: "Berikut daftar Asma'ul Husna",
  url: `${MetaUrl.Site_Url}/asmaul-husna`,
};

const { title, description, url } = baseMetadata;

export const metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    url,
    title,
    description,
    images: [
      {
        url: MetaUrl.Default_Og_Url,
        alt: "OG Image",
      },
    ],
    siteName: "info-jadwal-sholat.vercel.app/asmaul-husna",
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

async function getAsmaulHusna(): Promise<AsmaulHusnaProps[]> {
  try {
    const response: { data: AsmaulHusnaProps[] } = await getData(
      `${NEXT_PUBLIC_ASMAUL_HUSNA_API}/api/all`
    );
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export default async function AsmaulHusna() {
  const asmaulHusna = await getAsmaulHusna();

  return (
    <TransitionLayout
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cx(
        "flex w-full max-w-full",
        "flex-col items-center justify-start",
        "pt-8 pb-24 md:pb-8"
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <h1
            className={cx(
              "text-3xl font-bold tracking-wide sm:text-4xl",
              bitter.className
            )}
          >
            Asma&#39;ul Husna
          </h1>
        </div>
        <p data-cy="description" className="mt-2 my-7 text-lg font-medium">
          Berikut daftar Asma&#39;ul Husna
        </p>
      </div>
      <AsmaulHusnaClient asmaulHusna={asmaulHusna} />
    </TransitionLayout>
  );
}
