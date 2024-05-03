import { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import TransitionLayout from "~components/transition-layout";
import { MetaUrl } from "~lib/utils/enums";

const Time = dynamic(() => import("~components/time"), {
  loading: () => (
    <div className="w-72 h-6 animate-pulse bg-gray-300 dark:bg-gray-700"></div>
  ),
  ssr: false,
});

const baseMetadata = {
  title: "Home | Jadwal Sholat",
  description: `"Maka nikmat Tuhanmu yang manakah yang kamu dustakan", Ar-Rahman ayat 13`,
  url: MetaUrl.Site_Url,
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

export default function HomePage() {
  return (
    <TransitionLayout
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen flex-col items-center justify-center text-center"
    >
      <Image
        src="/img/home.webp"
        width={100}
        height={100}
        alt="Al-Quran"
        fetchPriority="high"
        draggable={false}
      />
      <div className="mt-3 flex flex-col items-center justify-center text-center">
        <Time />
      </div>
    </TransitionLayout>
  );
}
