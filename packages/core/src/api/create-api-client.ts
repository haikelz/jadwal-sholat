import type { ZodType } from "zod";
import { asmaulHusnaResponseSchema } from "../schemas/asmaul-husna";
import {
  hadithBookListResponseSchema,
  hadithDetailResponseSchema,
  hadithRangeResponseSchema,
} from "../schemas/hadith";
import {
  nominatimPlaceSchema,
  nominatimSearchSchema,
} from "../schemas/nominatim";
import { prayerMonthSchema } from "../schemas/prayer";
import { puasaScheduleResponseSchema } from "../schemas/puasa-sunnah";
import {
  surahDetailResponseSchema,
  surahListResponseSchema,
} from "../schemas/quran";
import type { Coordinates } from "../prayer/location";
import { getJson, type RequestOptions } from "./http";
import {
  asmaulHusnaUrl,
  hadithBooksUrl,
  hadithDetailUrl,
  hadithRangeUrl,
  nominatimReverseUrl,
  nominatimSearchUrl,
  prayerMonthUrl,
  puasaScheduleUrl,
  surahListUrl,
  surahUrl,
  type ApiBaseUrls,
} from "./urls";

export type ApiClientOptions = {
  baseUrls: ApiBaseUrls;
  /** Sent with every request; native apps set an identifying User-Agent. */
  headers?: Record<string, string>;
};

/** Typed, validated fetchers for every API the apps use. */
export function createApiClient({ baseUrls, headers }: ApiClientOptions) {
  function get<T>(url: string, schema: ZodType<T>, signal?: AbortSignal) {
    const options: RequestOptions = { headers, signal };
    return getJson(url, schema, options);
  }

  return {
    async asmaulHusna(signal?: AbortSignal) {
      return (await get(asmaulHusnaUrl(baseUrls.asmaulHusna), asmaulHusnaResponseSchema, signal)).data;
    },
    async hadithBooks(signal?: AbortSignal) {
      return (await get(hadithBooksUrl(baseUrls.hadith), hadithBookListResponseSchema, signal)).data;
    },
    async hadithDetail(bookId: string, hadithNumber: number, signal?: AbortSignal) {
      return (
        await get(hadithDetailUrl(baseUrls.hadith, bookId, hadithNumber), hadithDetailResponseSchema, signal)
      ).data;
    },
    async hadithPage(bookId: string, page: number, signal?: AbortSignal) {
      return (await get(hadithRangeUrl(baseUrls.hadith, bookId, page), hadithRangeResponseSchema, signal)).data;
    },
    async placeLabel(position: Coordinates, signal?: AbortSignal) {
      return get(nominatimReverseUrl(baseUrls.nominatim, position), nominatimPlaceSchema, signal);
    },
    async placeSearch(query: string, signal?: AbortSignal) {
      return get(nominatimSearchUrl(baseUrls.nominatim, query), nominatimSearchSchema, signal);
    },
    async prayerMonth(
      params: { month: string; position: Coordinates; year: string },
      signal?: AbortSignal,
    ) {
      return (await get(prayerMonthUrl(baseUrls.prayer, params), prayerMonthSchema, signal)).data;
    },
    async puasaSchedule(month: string, signal?: AbortSignal) {
      return (await get(puasaScheduleUrl(baseUrls.puasaSunnah, month), puasaScheduleResponseSchema, signal)).data;
    },
    async surah(surahNumber: number, qori: number, signal?: AbortSignal) {
      return (await get(surahUrl(baseUrls.quran, surahNumber, qori), surahDetailResponseSchema, signal)).data;
    },
    async surahList(signal?: AbortSignal) {
      return (await get(surahListUrl(baseUrls.quran), surahListResponseSchema, signal)).data;
    },
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;
