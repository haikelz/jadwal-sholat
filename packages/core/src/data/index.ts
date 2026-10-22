import { asmaulHusnaListSchema } from "../schemas/asmaul-husna";
import { surahListSchema } from "../schemas/quran";
import asmaulHusnaJson from "./asmaul-husna.json";
import surahListJson from "./surah-list.json";

// Snapshots made by scripts/snapshot-static-data.ts. Parsing here keeps the
// types honest if someone edits the JSON by hand; it costs ~200 small objects.
export const SURAH_LIST = surahListSchema.parse(surahListJson);

export const ASMAUL_HUSNA = asmaulHusnaListSchema.parse(asmaulHusnaJson);
