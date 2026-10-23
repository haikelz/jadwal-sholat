import { Homepage } from "@/components/homepage";
import { PageShell } from "@/components/common/page-shell";
import { createPageMetadata } from "@/lib/utils/metadata";

export const metadata = createPageMetadata({
  title: "Jadwal Sholat Hari Ini Sesuai Lokasi Kamu",
  description:
    "Waktu sholat hari ini dan sebulan penuh sesuai lokasi kamu, metode Kemenag RI: Imsak, Subuh, Dzuhur, Ashar, Maghrib, Isya, plus pengingat adzan.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <PageShell>
      <Homepage />
    </PageShell>
  );
}
