import { sitemapXml } from "@/lib/sitemap";
import { getData } from "@/lib/utils/get-data";
import { SITE_URL } from "@/lib/utils/metadata";
import { env } from "@/lib/utils/public-env";
import { hadithBooksUrl } from "@jadwal-sholat/core/api";
import type { HadithBook } from "@jadwal-sholat/core/schemas";
import type { APIRoute } from "astro";

/**
 * Every hadith page (about 38,000, under the 50,000-URL limit), built from
 * the book list at build time. Hadith pages render in the browser, so this is
 * how crawlers find them.
 */
export const GET: APIRoute = async () => {
  try {
    const { data: books } = await getData<{ data: HadithBook[] }>(hadithBooksUrl(env.HADITH_API));
    return sitemapXml(
      books.flatMap((book) =>
        Array.from(
          { length: book.available },
          (_, index) => `${SITE_URL}/hadith/${book.id}/${index + 1}`,
        ),
      ),
    );
  } catch {
    // The API is down: ship an empty sitemap rather than fail the build.
    return sitemapXml([]);
  }
};
