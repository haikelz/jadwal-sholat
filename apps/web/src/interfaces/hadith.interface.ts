// The hadith API's shapes, from packages/core (shared with the Android app).
import type { Hadith, HadithBook, HadithDetail, HadithRange } from "@jadwal-sholat/core/schemas";

export type { HadithBook };
export type HadithProps = Hadith;
export type HadithBooksResponse = { data: HadithBook[] };
export type HadithRangeResponse = { data: HadithRange };
export type HadithDetailResponse = { data: HadithDetail };
