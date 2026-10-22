import { z } from "zod";

// nominatim.openstreetmap.org, format=jsonv2
export const nominatimAddressSchema = z.object({
  city: z.string().optional(),
  county: z.string().optional(),
  municipality: z.string().optional(),
  state: z.string().optional(),
  town: z.string().optional(),
  village: z.string().optional(),
});

export type NominatimAddress = z.infer<typeof nominatimAddressSchema>;

export const nominatimPlaceSchema = z.object({
  address: nominatimAddressSchema.optional(),
  display_name: z.string(),
  lat: z.coerce.number(),
  lon: z.coerce.number(),
  place_id: z.number(),
});

export type NominatimPlace = z.infer<typeof nominatimPlaceSchema>;

export const nominatimSearchSchema = z.array(nominatimPlaceSchema);
