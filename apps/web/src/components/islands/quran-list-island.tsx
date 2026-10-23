import { Providers } from "@/components/providers";
import { QuranPage } from "@/components/quran/quran-page";
import type { ListSuratProps } from "@/interfaces";

/** The surah list island: search, filter, sort and continue reading. */
export function QuranListIsland({ surat }: { surat: ListSuratProps }) {
  return (
    <Providers>
      <QuranPage surat={surat} />
    </Providers>
  );
}
