import { HadithPage, type HadithListInitialData } from "@/components/hadith/hadith-page";
import { Providers } from "@/components/providers";

export function HadithListIsland({ initialData }: { initialData: HadithListInitialData }) {
  return (
    <Providers>
      <HadithPage initialData={initialData} />
    </Providers>
  );
}
