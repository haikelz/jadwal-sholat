import { getData } from "@/lib/utils/get-data";
import { SITE_URL } from "@/lib/utils/metadata";
import { env } from "@/lib/utils/public-env";
import type { MetadataRoute } from "next";

const { NEXT_PUBLIC_HADITH_API } = env;

// The hadith list loads in the browser, so crawlers can't follow its links;
// this lists every hadith page instead (about 38,000, under the 50,000 limit).
export const revalidate = 86400;

type BookList = { data: { id: string; available: number }[] };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const { data: books } = await getData<BookList>(
      `${NEXT_PUBLIC_HADITH_API}/books`,
    );
    return books.flatMap((book) =>
      Array.from({ length: book.available }, (_, index) => ({
        url: `${SITE_URL}/hadith/${book.id}/${index + 1}`,
      })),
    );
  } catch {
    // The API is down: serve an empty sitemap and retry on revalidation,
    // rather than failing the build.
    return [];
  }
}
