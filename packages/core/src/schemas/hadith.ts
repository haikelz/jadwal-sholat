import { z } from "zod";

// hadith.ekel.dev
export const hadithBookSchema = z.object({
  available: z.number(),
  id: z.string(),
  name: z.string(),
});

export type HadithBook = z.infer<typeof hadithBookSchema>;

export const hadithBookListResponseSchema = z.object({
  data: z.array(hadithBookSchema),
});

export const hadithSchema = z.object({
  arab: z.string(),
  id: z.string(),
  number: z.number(),
});

export type Hadith = z.infer<typeof hadithSchema>;

export const hadithRangeResponseSchema = z.object({
  data: hadithBookSchema.extend({
    hadiths: z.array(hadithSchema),
  }),
});

export type HadithRange = z.infer<typeof hadithRangeResponseSchema>["data"];

export const hadithDetailResponseSchema = z.object({
  data: hadithBookSchema.extend({
    contents: hadithSchema,
  }),
});

export type HadithDetail = z.infer<typeof hadithDetailResponseSchema>["data"];
