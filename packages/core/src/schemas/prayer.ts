import { z } from "zod";

// aladhan.com calendar, method 20 (Kemenag RI). Times look like "04:21 (WIB)".
export const prayerTimingsSchema = z.object({
  Asr: z.string(),
  Dhuhr: z.string(),
  Fajr: z.string(),
  Imsak: z.string(),
  Isha: z.string(),
  Maghrib: z.string(),
  Sunrise: z.string(),
  Sunset: z.string(),
});

export type PrayerTimings = z.infer<typeof prayerTimingsSchema>;

export const prayerDaySchema = z.object({
  date: z.object({
    gregorian: z.object({
      /** "dd-MM-yyyy", matched against getDateParts().matchDate. */
      date: z.string(),
    }),
    hijri: z.object({
      day: z.string(),
      month: z.object({
        ar: z.string(),
        en: z.string(),
        number: z.number(),
      }),
      year: z.string(),
    }),
    readable: z.string(),
  }),
  meta: z
    .object({
      timezone: z.string(),
    })
    .optional(),
  timings: prayerTimingsSchema,
});

export type PrayerDay = z.infer<typeof prayerDaySchema>;

export const prayerMonthSchema = z.object({
  data: z.array(prayerDaySchema),
});

export type PrayerMonth = z.infer<typeof prayerMonthSchema>;
