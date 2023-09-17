import { cx } from "classix";
import dynamic from "next/dynamic";
import Image from "next/image";
import { hours } from "~lib/utils/constants";
import { MetaUrl } from "~lib/utils/enums";
import { bitter } from "~lib/utils/fonts";

const Time = dynamic(() => import("~components/molecules/time"), {
  ssr: false,
});

const baseMetadata = {
  title: "Home | Jadwal Sholat",
  description: `"Maka nikmat Tuhanmu yang manakah yang kamu dustakan", Ar-Rahman ayat 13`,
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

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <Image src="/img/home.webp" width={100} height={100} alt="Al-Quran" loading="eager" />
      <div className="mt-3 flex flex-col items-center justify-center text-center">
        <h1
          className={cx("text-3xl font-bold tracking-wide sm:text-4xl", bitter.className)}
        >{`Selamat ${
          hours >= 12 && hours < 15
            ? "Siang"
            : hours >= 15 && hours < 18
            ? "Sore"
            : hours >= 18 && hours < 24
            ? "Malam"
            : "Pagi"
        }`}</h1>
        <p className="mb-1 mt-2 text-lg font-medium md:text-xl">
          &#34;Maka nikmat Tuhanmu yang manakah yang kamu dustakan&#34;
          <br />
          Ar-Rahman ayat 13
        </p>
        <Time />
      </div>
    </div>
  );
}
