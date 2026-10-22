export const PUASA_TYPES = [
  { key: "all", name: "Semua" },
  { key: "monday_thursday", name: "Puasa Senin dan Kamis" },
  { key: "white_days", name: "Puasa Ayyamul Bidh" },
  { key: "six_shawwal_candidate", name: "Enam hari puasa Syawal" },
  { key: "ashura", name: "Puasa Asyura dan hari pendamping" },
  { key: "first_nine_dhul_hijjah", name: "Sembilan hari pertama Zulhijah" },
  { key: "arafah", name: "Puasa Arafah" },
] as const;

export type PuasaTypeFilter = (typeof PUASA_TYPES)[number]["key"];
