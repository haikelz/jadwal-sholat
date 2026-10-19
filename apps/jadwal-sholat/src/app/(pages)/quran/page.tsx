import { PageHeader, PageShell } from "@/components/common/page-shell";
import { QuranPage } from "@/components/quran/quran-page";
import { env } from "@/lib/utils/public-env";
import { ListSuratProps } from "@/interfaces";
import { getData } from "@/lib/utils/get-data";
import { createPageMetadata } from "@/lib/utils/metadata";
import { Suspense } from "react";

const { NEXT_PUBLIC_QURAN_API } = env;

export const metadata = createPageMetadata({
  title: "Baca Al-Qur'an",
  description:
    "Baca Al-Qur'an lengkap dengan audio, transliterasi, terjemahan, dan tafsir.",
  path: "/quran",
});

async function getSurat(): Promise<ListSuratProps> {
  try {
    const response: ListSuratProps = await getData(
      `${NEXT_PUBLIC_QURAN_API}/quran`,
    );
    // The API also returns tafsir and recitation for every surah (~170KB).
    // Pass only what the list renders so the page payload stays small.
    return {
      data: response.data.map(({ number, asma, ayahCount, type }) => ({
        number,
        asma: {
          id: { short: asma.id.short },
          translation: { id: asma.translation.id },
        },
        ayahCount,
        type: { id: type.id },
      })),
    };
  } catch (err: any) {
    throw new Error("Failed to fetch data!");
  }
}

export default async function Quran() {
  const surat = await getSurat();

  return (
    <PageShell width="reading">
      <PageHeader
        title="Baca Al-Qur'an"
        description="Berlomba-lombalah dalam berbuat kebaikan."
      />
      <Suspense>
        <QuranPage surat={surat} />
      </Suspense>
    </PageShell>
  );
}
