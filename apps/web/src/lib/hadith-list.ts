import type { HadithListInitialData } from "@/components/hadith/hadith-page";
import type { HadithBooksResponse, HadithRangeResponse } from "@/interfaces";
import { getData } from "@/lib/utils/get-data";
import { toDescription } from "@/lib/utils/metadata";
import { env } from "@/lib/utils/public-env";
import { hadithBooksUrl, hadithRangeUrl } from "@jadwal-sholat/core/api";

export function getHadithBooks() {
  return getData<HadithBooksResponse>(hadithBooksUrl(env.HADITH_API), {
    signal: AbortSignal.timeout(15_000),
  });
}

/**
 * A book's first page, built into the HTML so crawlers reach hadith pages
 * through links. Rows show two lines of the translation, so only a short
 * snippet reaches the island, and no Arabic. A slow or failing API must not
 * fail the build: the list then loads in the browser instead.
 */
export async function loadHadithList(
  book: string,
  books?: HadithBooksResponse,
): Promise<HadithListInitialData | undefined> {
  try {
    const signal = AbortSignal.timeout(15_000);
    const [bookList, firstPage] = await Promise.all([
      books ?? getHadithBooks(),
      getData<HadithRangeResponse>(hadithRangeUrl(env.HADITH_API, book, 1), { signal }),
    ]);
    return {
      book,
      books: bookList,
      firstPage: {
        ...firstPage,
        data: {
          ...firstPage.data,
          hadiths: firstPage.data.hadiths.map(({ number, id }) => ({
            number,
            arab: "",
            id: toDescription(id, 200),
          })),
        },
      },
    };
  } catch {
    return undefined;
  }
}
