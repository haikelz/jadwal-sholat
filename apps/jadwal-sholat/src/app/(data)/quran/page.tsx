import { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import TransitionLayout from "~components/transition-layout";
import { env } from "~env.mjs";
import { ListSuratProps } from "~interfaces";
import { getData } from "~lib/utils/axios-config";
import { cn } from "~lib/utils/cn";
import { MetaUrl } from "~lib/utils/enums";
import { bitter } from "~lib/utils/fonts";

const { NEXT_PUBLIC_QURAN_API } = env;

const QuranClient = dynamic(() => import("./client"));

const baseMetadata = {
  title: "Baca Al-Qur'an | Jadwal Sholat",
  description: "Berlomba-lombalah kamu dalam berbuat kebaikan",
  url: `${MetaUrl.Site_Url}/quran`,
};

const { title, description, url } = baseMetadata;

export const metadata: Metadata = {
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
    siteName: "jdwshlt.ekel.dev/quran",
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

async function getSurat(): Promise<ListSuratProps> {
  try {
    const response: ListSuratProps = await getData(
      `${NEXT_PUBLIC_QURAN_API}/quran`
    );
    return response;
  } catch (err: any) {
    throw new Error("Failed to fetch data!");
  }
}

export default async function Quran() {
  const surat = await getSurat();

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
        <div className="flex items-center justify-center space-x-3">
          <h1
            className={cn(
              "text-3xl font-bold tracking-wide sm:text-4xl",
              bitter.className
            )}
          >
            Baca Al-Qur&#39;an
          </h1>
          <Image
            src="/img/Quran.webp"
            width={40}
            height={40}
            alt="Al-Qur'an"
            fetchPriority="high"
            draggable={false}
          />
        </div>
        <p data-cy="description" className="mt-2 text-lg font-medium">
          &#34;Berlomba-lombalah kamu dalam berbuat kebaikan&#34;
        </p>
      </div>
      <QuranClient surat={surat} />
    </TransitionLayout>
  );
}
