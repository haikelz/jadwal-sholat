// Refreshes the bundled data that never changes (114 surahs, 99 names).
// Run: bun scripts/snapshot-static-data.ts   (from packages/core)
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { asmaulHusnaUrl, surahListUrl } from "../src/api/urls";
import { getJson } from "../src/api/http";
import { asmaulHusnaResponseSchema } from "../src/schemas/asmaul-husna";
import { surahListResponseSchema } from "../src/schemas/quran";

const QURAN_API = process.env.QURAN_API ?? "https://quran.ekel.dev";
const ASMAUL_HUSNA_API =
  process.env.ASMAUL_HUSNA_API ?? "https://asmaul-husna-api.vercel.app";
const DATA_DIR = join(import.meta.dir, "../src/data");

async function writeJson(name: string, value: unknown) {
  await writeFile(join(DATA_DIR, name), `${JSON.stringify(value, null, 2)}\n`);
}

const surahs = (
  await getJson(surahListUrl(QURAN_API), surahListResponseSchema)
).data.sort((a, b) => a.number - b.number);
if (surahs.length !== 114) throw new Error(`Expected 114 surahs, got ${surahs.length}`);

const names = (
  await getJson(asmaulHusnaUrl(ASMAUL_HUSNA_API), asmaulHusnaResponseSchema)
).data.sort((a, b) => a.urutan - b.urutan);
if (names.length !== 99) throw new Error(`Expected 99 names, got ${names.length}`);

await writeJson("surah-list.json", surahs);
await writeJson("asmaul-husna.json", names);
console.log(`Wrote ${surahs.length} surahs and ${names.length} names.`);
