import { Homepage } from "@/components/homepage";
import { PageShell } from "@/components/common/page-shell";
import { createPageMetadata } from "@/lib/utils/metadata";

export const metadata = createPageMetadata({
  title: "Jadwal Sholat",
  description: "Lihat jadwal sholat bulan ini berdasarkan lokasi kamu.",
  path: "/",
});

export default function Home() {
  return (
    <PageShell>
      <Homepage />
    </PageShell>
  );
}
