import { cacheExchange, createClient, fetchExchange } from "@urql/next";
import { registerUrql } from "@urql/next/rsc";
import dynamic from "next/dynamic";
import TransitionLayout from "~components/transition-layout";
import { env } from "~env.mjs";
import { cn } from "~lib/utils/cn";
import { MetaUrl } from "~lib/utils/enums";
import { bitter } from "~lib/utils/fonts";
import { GetAllAsmaulHusnaQuery } from "~lib/utils/graphql";

const AsmaulHusnaClient = dynamic(() => import("./client"));

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
const urqlClient = () =>
  createClient({
    url: `${NEXT_PUBLIC_ASMAUL_HUSNA_API}/api/graphql`,
    exchanges: [cacheExchange, fetchExchange],
  });

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
        "pt-8 pb-24 md:pb-8"
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
      <AsmaulHusnaClient asmaulHusna={asmaulHusna.data.allAsmaulHusna.data} />
    </TransitionLayout>
  );
}
