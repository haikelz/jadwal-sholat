import { registerUrql } from "@urql/next/rsc";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import TransitionLayout from "~components/transition-layout";
import { cn } from "~lib/utils/cn";
import { MetaUrl } from "~lib/utils/enums";
import { bitter } from "~lib/utils/fonts";
import { GetAllAsmaulHusnaQuery, urqlClient } from "~lib/utils/graphql";

const AsmaulHusnaClient = dynamic(() => import("./client"));

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
    siteName: "jdwshlt.ekel.dev/asmaul-husna",
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

/**
 * @see https://commerce.nearform.com/open-source/urql/docs/advanced/server-side-rendering/#invalidating-data-from-a-server-component
 */
const { getClient } = registerUrql(urqlClient);

export default async function AsmaulHusna() {
  const asmaulHusna = await getClient().query(GetAllAsmaulHusnaQuery, {});

  return (
    <TransitionLayout
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "flex w-full max-w-full",
        "flex-col items-center justify-start",
        "py-8"
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <h1
            className={cn(
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
      <Suspense>
        <AsmaulHusnaClient asmaulHusna={asmaulHusna.data.allAsmaulHusna.data} />
      </Suspense>
    </TransitionLayout>
  );
}
