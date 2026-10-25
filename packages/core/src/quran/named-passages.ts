export type NamedPassage = {
  slug: string;
  /** What people search for, e.g. "Ayat Kursi". */
  name: string;
  surah: number;
  /** First and last ayah, numbered within the surah. */
  from: number;
  to: number;
};

/** Passages known and searched by name; each gets a page at /ayat/<slug>. */
export const NAMED_PASSAGES: readonly NamedPassage[] = [
  { slug: "ayat-kursi", name: "Ayat Kursi", surah: 2, from: 255, to: 255 },
  { slug: "amanar-rasul", name: "Amanar Rasul", surah: 2, from: 285, to: 286 },
  { slug: "ayat-seribu-dinar", name: "Ayat Seribu Dinar", surah: 65, from: 2, to: 3 },
  { slug: "doa-nabi-yunus", name: "Doa Nabi Yunus", surah: 21, from: 87, to: 87 },
  { slug: "doa-sapu-jagat", name: "Doa Sapu Jagat", surah: 2, from: 201, to: 201 },
  { slug: "hasbunallah", name: "Hasbunallah wa Ni'mal Wakil", surah: 3, from: 173, to: 173 },
  { slug: "doa-nabi-musa", name: "Doa Nabi Musa", surah: 20, from: 25, to: 28 },
  { slug: "akhir-surat-al-hasyr", name: "Tiga Ayat Terakhir Surat Al-Hasyr", surah: 59, from: 22, to: 24 },
];

/** "255" or "285–286". */
export function passageRange({ from, to }: Pick<NamedPassage, "from" | "to">) {
  return from === to ? String(from) : `${from}–${to}`;
}
