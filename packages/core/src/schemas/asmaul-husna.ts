import { z } from "zod";

// asmaul-husna-api.vercel.app/api/all
export const asmaulHusnaSchema = z.object({
  arab: z.string(),
  arti: z.string(),
  latin: z.string(),
  urutan: z.number(),
});

export type AsmaulHusna = z.infer<typeof asmaulHusnaSchema>;

export const asmaulHusnaListSchema = z.array(asmaulHusnaSchema);

export const asmaulHusnaResponseSchema = z.object({
  data: asmaulHusnaListSchema,
});
