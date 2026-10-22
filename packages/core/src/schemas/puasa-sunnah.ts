import { z } from "zod";

// puasasunnah.ekel.dev/api/id/fasting/schedules
export const puasaRecommendationSchema = z.object({
  key: z.string(),
  name: z.string(),
});

export type PuasaRecommendation = z.infer<typeof puasaRecommendationSchema>;

export const puasaDateSchema = z.object({
  /** "yyyy-MM-dd" */
  date: z.string(),
  hijri: z.object({
    day: z.number(),
    month: z.number(),
    year: z.number(),
  }),
  recommendations: z.array(puasaRecommendationSchema),
  weekday: z.string(),
});

export type PuasaDate = z.infer<typeof puasaDateSchema>;

export const puasaScheduleResponseSchema = z.object({
  data: z.object({
    dates: z.array(puasaDateSchema),
    end_date: z.string(),
    start_date: z.string(),
    timezone: z.string(),
  }),
});

export type PuasaSchedule = z.infer<typeof puasaScheduleResponseSchema>["data"];
