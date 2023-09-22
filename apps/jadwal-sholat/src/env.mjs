import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_QURAN_API: z.string().url().min(1),
    NEXT_PUBLIC_PUASA_SUNNAH_API: z.string().url().min(1),
    NEXT_PUBLIC_JADWAL_SHOLAT_API: z.string().url().min(1),
    NEXT_PUBLIC_ASMAUL_HUSNA_API: z.string().url().min(1),
  },
  server: {
    NEXT_PUBLIC_PRODUCTION_URL: z.string().url().min(1),
    NEXT_PUBLIC_DEVELOPMENT_URL: z.string().url().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_QURAN_API: process.env.NEXT_PUBLIC_QURAN_API,
    NEXT_PUBLIC_PUASA_SUNNAH_API: process.env.NEXT_PUBLIC_PUASA_SUNNAH_API,
    NEXT_PUBLIC_JADWAL_SHOLAT_API: process.env.NEXT_PUBLIC_JADWAL_SHOLAT_API,
    NEXT_PUBLIC_ASMAUL_HUSNA_API: process.env.NEXT_PUBLIC_ASMAUL_HUSNA_API,
  },
});
