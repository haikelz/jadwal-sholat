import { Providers } from "@/components/providers";
import { DetailSuratPage } from "@/components/quran/detail-surat/detail-surat-page";
import type { SuratProps } from "@/interfaces";

/** A surah's reading island: toolbar, ayahs, audio and the pager. */
export function QuranSurahIsland({
  number,
  initialData,
}: {
  number: string;
  initialData: SuratProps;
}) {
  return (
    <Providers>
      <DetailSuratPage number={number} initialData={initialData} />
    </Providers>
  );
}
