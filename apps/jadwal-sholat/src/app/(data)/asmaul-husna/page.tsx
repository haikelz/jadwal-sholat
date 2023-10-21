import { cx } from "classix";
import { ListAsmaulHusna } from "~components/organisms";
import { env } from "~env.mjs";
import { AsmaulHusnaProps } from "~interfaces";
import { getData } from "~lib/utils/axios-config";
import { MetaUrl } from "~lib/utils/enums";
import { bitter } from "~lib/utils/fonts";

const { NEXT_PUBLIC_ASMAUL_HUSNA_API } = env;

const baseMetadata = {
  title: "Asma'ul Husna | Jadwal Sholat",
  description: "Berikut daftar Asma'ul Husna",
  url: MetaUrl.Site_Url,
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
    siteName: "info-jadwal-sholat.vercel.app",
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

interface GetAsmaulHusnaProps {
  data: AsmaulHusnaProps[];
}

async function getAsmaulHusna(): Promise<AsmaulHusnaProps[]> {
  const response: GetAsmaulHusnaProps = await getData(`${NEXT_PUBLIC_ASMAUL_HUSNA_API}/all`);
  return response.data;
}

export default async function AsmaulHusna(): Promise<JSX.Element> {
  const asmaulHusna = await getAsmaulHusna();

  return (
    <div
      className={cx(
        "flex w-full max-w-full",
        "flex-col items-center justify-start",
        "space-y-7 pt-8 pb-24 md:pb-8"
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <h1 className={cx("text-3xl font-bold tracking-wide sm:text-4xl", bitter.className)}>
            Asma&#39;ul Husna
          </h1>
        </div>
        <p data-cy="description" className="mt-2 text-lg font-medium">
          Berikut daftar Asma&#39;ul Husna
        </p>
      </div>
      <ListAsmaulHusna asmaulHusna={asmaulHusna} />
    </div>
  );
}
