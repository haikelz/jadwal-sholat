import { cx } from "classix";
import { Metadata } from "next";
import { TableJadwalSholat } from "~components/organisms";
import { env } from "~env.mjs";
import { ofetch } from "~lib/utils/configured-ofetch";
import { DEFAULT_OG_URL, bulan, currentDate, hari, tahun } from "~lib/utils/constants";
import { bitter } from "~lib/utils/fonts";
import { KotaProps } from "~models";

const { NEXT_PUBLIC_JADWAL_SHOLAT_API } = env;
const formatDate: string = `${tahun}/${bulan}`;

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const response: KotaProps[] = await ofetch(`${NEXT_PUBLIC_JADWAL_SHOLAT_API}/kota/semua`);
  return response.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata | undefined> {
  const { id } = params;
  const response: { data: KotaProps } = await ofetch(
    `${NEXT_PUBLIC_JADWAL_SHOLAT_API}/jadwal/${id}/${formatDate}`
  );
  const { lokasi } = response.data;

  return {
    title: `${lokasi} | Jadwal Sholat`,
    description: `Jadwal Sholat di ${lokasi}`,
    openGraph: {
      type: "book",
      url: `${NEXT_PUBLIC_JADWAL_SHOLAT_API}/jadwal/${id}/${formatDate}`,
      title: lokasi,
      description: `Jadwal Sholat di ${lokasi}`,
      siteName: "info-jadwal-sholat.vercel.app",
      images: [
        {
          url: DEFAULT_OG_URL,
          alt: "OG Image",
        },
      ],
    },
    twitter: {
      title: lokasi,
      description: `Jadwal Sholat di ${lokasi}`,
      site: `${NEXT_PUBLIC_JADWAL_SHOLAT_API}/jadwal/${id}/${formatDate}`,
      card: "summary_large_image",
    },
    metadataBase: new URL(`${NEXT_PUBLIC_JADWAL_SHOLAT_API}/jadwal/${id}/${formatDate}`),
  };
}

async function getData(id: string) {
  const response = await ofetch(`${NEXT_PUBLIC_JADWAL_SHOLAT_API}/jadwal/${id}/${formatDate}`);
  return response.data;
}

export default async function KotaId({ params }: { params: { id: string } }) {
  const { id } = params;

  const waktu = await getData(id);

  return (
    <div
      className={cx(
        "flex w-full max-w-full",
        "flex-col items-center justify-start",
        "space-y-7 pt-8 pb-24 md:pb-8"
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className={cx("text-3xl font-bold tracking-wide sm:text-4xl", bitter.className)}>
          {waktu.lokasi}
        </h1>
        <p className="text-lg font-medium">
          PROVINSI {waktu.daerah}, {currentDate.toUpperCase()}
        </p>
      </div>
      <div className="flex w-full items-center overflow-x-auto text-center lg:justify-center">
        <TableJadwalSholat tanggal={hari} tahun={tahun} bulan={bulan} waktu={waktu} />
      </div>
    </div>
  );
}
