import { Homepage } from "@/components/homepage";
import { TransitionLayout } from "@/components/transition-layout";
import { cn } from "@/lib/utils/cn";
import { createPageMetadata } from "@/lib/utils/metadata";

export const metadata = createPageMetadata({
  title: "Jadwal Sholat",
  description: "Lihat jadwal sholat bulan ini berdasarkan lokasi kamu.",
  path: "/",
});

export default function Home() {
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
      <Homepage />
    </TransitionLayout>
  );
}
