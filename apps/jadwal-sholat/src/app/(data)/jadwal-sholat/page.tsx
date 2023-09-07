import { cx } from "classix";
import Image from "next/image";
import { ListKota } from "~components/organisms";
import { env } from "~env.mjs";
import { getData } from "~lib/utils/axios-config";
import { DEFAULT_OG_URL, SITE_URL } from "~lib/utils/constants";
import { bitter } from "~lib/utils/fonts";

const { NEXT_PUBLIC_JADWAL_SHOLAT_API } = env;

const baseMetadata = {
  title: "Jadwal Sholat",
  description: "Berikut daftar Kabupaten/Kota yang tersedia",
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

async function getJadwalSholat() {
  const response = await getData(`${NEXT_PUBLIC_JADWAL_SHOLAT_API}/kota/semua`);
  return response;
}

export default async function JadwalSholat() {
  const kota = await getJadwalSholat();

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
            Jadwal Sholat
          </h1>
          <Image
            src="/img/mosque.webp"
            width={40}
            height={40}
            alt="Mosque"
            priority
            loading="eager"
          />
        </div>
        <p className="mt-2 text-lg font-medium">Berikut daftar Kabupaten/Kota yang tersedia</p>
      </div>
      <ListKota kota={kota} />
    </div>
  );
}
