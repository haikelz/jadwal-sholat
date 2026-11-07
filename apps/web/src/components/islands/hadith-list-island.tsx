import { HadithPage, type HadithListInitialData } from "@/components/hadith/hadith-page";
import { Providers } from "@/components/providers";

export function HadithListIsland({
  initialData,
  book,
}: {
  initialData?: HadithListInitialData;
  book?: string;
}) {
  return (
    <Providers>
      <HadithPage initialData={initialData} book={book} />
    </Providers>
  );
}
