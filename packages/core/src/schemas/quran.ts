import { z } from "zod";

// quran.ekel.dev. Unknown keys are stripped by zod, so the list keeps only
// the fields a list row renders instead of every surah's tafsir (~170KB).
export const surahTypeSchema = z.object({
  id: z.string(),
});

export const surahListItemSchema = z.object({
  asma: z.object({
    id: z.object({ short: z.string() }),
    translation: z.object({ id: z.string() }),
  }),
  ayahCount: z.coerce.number(),
  number: z.coerce.number(),
  type: surahTypeSchema,
});

export type SurahListItem = z.infer<typeof surahListItemSchema>;

export const surahListSchema = z.array(surahListItemSchema);

export const surahListResponseSchema = z.object({
  data: surahListSchema,
});

export const ayahSchema = z.object({
  audio: z.object({ url: z.string() }),
  number: z.object({
    inquran: z.number(),
    insurah: z.number(),
  }),
  text: z.object({
    // The first ayah of Al-Fatihah starts with a byte-order mark.
    ar: z.string().transform((text) => text.replace(/^﻿/, "")),
    read: z.string(),
  }),
  translation: z.object({ id: z.string() }),
});

export type Ayah = z.infer<typeof ayahSchema>;

export const surahDetailSchema = z.object({
  asma: z.object({
    ar: z.object({ long: z.string(), short: z.string() }),
    id: z.object({ long: z.string(), short: z.string() }),
    translation: z.object({ id: z.string() }),
  }),
  ayahCount: z.number(),
  ayahs: z.array(ayahSchema),
  number: z.number(),
  preBismillah: z
    .object({
      text: z.object({ ar: z.string(), read: z.string() }),
      translation: z.object({ id: z.string() }),
    })
    .nullable(),
  tafsir: z.object({ id: z.string().nullable() }),
  type: surahTypeSchema,
});

export type SurahDetail = z.infer<typeof surahDetailSchema>;

export const surahDetailResponseSchema = z.object({
  data: surahDetailSchema,
});
