import { cx } from "classix";
import Image from "next/image";
import { ListSurat } from "~components/organisms";
import { env } from "~env.mjs";
import { ofetch } from "~lib/utils/configured-ofetch";
import { DEFAULT_OG_URL, SITE_URL } from "~lib/utils/constants";
import { bitter } from "~lib/utils/fonts";

const { NEXT_PUBLIC_QURAN_API } = env;

const baseMetadata = {
  title: "Baca Al-Qur'an | Jadwal Sholat",
  description: "Berlomba-lombalah kamu dalam berbuat kebaikan",
  url: SITE_URL,
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
        url: DEFAULT_OG_URL,
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

async function getData() {
  const response = await ofetch(`${NEXT_PUBLIC_QURAN_API}/quran`);
  return response;
}

export default async function Quran() {
  const surat = await getData();

  return (
    <div
      className={cx(
        "flex w-full max-w-full",
        "flex-col items-center justify-start",
        "space-y-7 pt-8 pb-24 md:pb-8"
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center space-x-3">
          <h1 className={cx("text-3xl font-bold tracking-wide sm:text-4xl", bitter.className)}>
            Baca Al-Qur&#39;an
          </h1>
          <Image src="/img/Quran.webp" width={40} height={40} alt="Al-Qur'an" />
        </div>
        <p className="mt-2 text-lg font-medium">
          &#34;Berlomba-lombalah kamu dalam berbuat kebaikan&#34;
        </p>
      </div>
      <ListSurat surat={surat} />
    </div>
  );
}
