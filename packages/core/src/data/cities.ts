import type { Coordinates } from "../prayer/location";

export type IndonesianTimeZone = "Asia/Jakarta" | "Asia/Makassar" | "Asia/Jayapura";

export type City = {
  slug: string;
  name: string;
  province: string;
  position: Coordinates;
  timeZone: IndonesianTimeZone;
};

export const ZONE_LABELS: Record<IndonesianTimeZone, "WIB" | "WITA" | "WIT"> = {
  "Asia/Jakarta": "WIB",
  "Asia/Makassar": "WITA",
  "Asia/Jayapura": "WIT",
};

const WIB = "Asia/Jakarta";
const WITA = "Asia/Makassar";
const WIT = "Asia/Jayapura";

// The capital of each of the 38 provinces, plus large cities people search by
// name. Centres rounded to ~1 km, which is plenty for prayer times. West to
// east, by province.
const ROWS: [slug: string, name: string, province: string, lat: number, lng: number, timeZone: IndonesianTimeZone][] = [
  ["banda-aceh", "Banda Aceh", "Aceh", 5.55, 95.32, WIB],
  ["medan", "Medan", "Sumatera Utara", 3.59, 98.67, WIB],
  ["padang", "Padang", "Sumatera Barat", -0.95, 100.35, WIB],
  ["pekanbaru", "Pekanbaru", "Riau", 0.51, 101.45, WIB],
  ["batam", "Batam", "Kepulauan Riau", 1.13, 104.05, WIB],
  ["tanjungpinang", "Tanjungpinang", "Kepulauan Riau", 0.92, 104.45, WIB],
  ["jambi", "Jambi", "Jambi", -1.61, 103.61, WIB],
  ["bengkulu", "Bengkulu", "Bengkulu", -3.8, 102.27, WIB],
  ["palembang", "Palembang", "Sumatera Selatan", -2.98, 104.76, WIB],
  ["pangkalpinang", "Pangkalpinang", "Kepulauan Bangka Belitung", -2.13, 106.11, WIB],
  ["bandar-lampung", "Bandar Lampung", "Lampung", -5.43, 105.26, WIB],
  ["serang", "Serang", "Banten", -6.12, 106.15, WIB],
  ["tangerang", "Tangerang", "Banten", -6.18, 106.63, WIB],
  ["tangerang-selatan", "Tangerang Selatan", "Banten", -6.29, 106.72, WIB],
  ["jakarta", "Jakarta", "DKI Jakarta", -6.21, 106.85, WIB],
  ["bandung", "Bandung", "Jawa Barat", -6.91, 107.61, WIB],
  ["bekasi", "Bekasi", "Jawa Barat", -6.24, 106.99, WIB],
  ["bogor", "Bogor", "Jawa Barat", -6.6, 106.8, WIB],
  ["depok", "Depok", "Jawa Barat", -6.4, 106.82, WIB],
  ["cirebon", "Cirebon", "Jawa Barat", -6.71, 108.56, WIB],
  ["tasikmalaya", "Tasikmalaya", "Jawa Barat", -7.33, 108.22, WIB],
  ["semarang", "Semarang", "Jawa Tengah", -6.97, 110.42, WIB],
  ["solo", "Solo (Surakarta)", "Jawa Tengah", -7.57, 110.82, WIB],
  ["yogyakarta", "Yogyakarta", "DI Yogyakarta", -7.8, 110.36, WIB],
  ["surabaya", "Surabaya", "Jawa Timur", -7.26, 112.75, WIB],
  ["malang", "Malang", "Jawa Timur", -7.98, 112.63, WIB],
  ["pontianak", "Pontianak", "Kalimantan Barat", -0.03, 109.33, WIB],
  ["palangka-raya", "Palangka Raya", "Kalimantan Tengah", -2.21, 113.92, WIB],
  ["denpasar", "Denpasar", "Bali", -8.65, 115.22, WITA],
  ["mataram", "Mataram", "Nusa Tenggara Barat", -8.58, 116.12, WITA],
  ["kupang", "Kupang", "Nusa Tenggara Timur", -10.18, 123.61, WITA],
  ["banjarmasin", "Banjarmasin", "Kalimantan Selatan", -3.32, 114.59, WITA],
  ["banjarbaru", "Banjarbaru", "Kalimantan Selatan", -3.44, 114.83, WITA],
  ["samarinda", "Samarinda", "Kalimantan Timur", -0.5, 117.15, WITA],
  ["balikpapan", "Balikpapan", "Kalimantan Timur", -1.27, 116.83, WITA],
  ["tanjung-selor", "Tanjung Selor", "Kalimantan Utara", 2.84, 117.37, WITA],
  ["manado", "Manado", "Sulawesi Utara", 1.47, 124.84, WITA],
  ["gorontalo", "Gorontalo", "Gorontalo", 0.54, 123.06, WITA],
  ["palu", "Palu", "Sulawesi Tengah", -0.9, 119.87, WITA],
  ["mamuju", "Mamuju", "Sulawesi Barat", -2.68, 118.89, WITA],
  ["makassar", "Makassar", "Sulawesi Selatan", -5.15, 119.43, WITA],
  ["kendari", "Kendari", "Sulawesi Tenggara", -3.97, 122.51, WITA],
  ["ambon", "Ambon", "Maluku", -3.7, 128.18, WIT],
  ["sofifi", "Sofifi", "Maluku Utara", 0.74, 127.56, WIT],
  ["ternate", "Ternate", "Maluku Utara", 0.79, 127.38, WIT],
  ["manokwari", "Manokwari", "Papua Barat", -0.86, 134.06, WIT],
  ["sorong", "Sorong", "Papua Barat Daya", -0.88, 131.26, WIT],
  ["jayapura", "Jayapura", "Papua", -2.53, 140.72, WIT],
  ["nabire", "Nabire", "Papua Tengah", -3.37, 135.5, WIT],
  ["wamena", "Wamena", "Papua Pegunungan", -4.1, 138.95, WIT],
  ["merauke", "Merauke", "Papua Selatan", -8.49, 140.4, WIT],
];

export const CITIES: readonly City[] = ROWS.map(([slug, name, province, lat, lng, timeZone]) => ({
  slug,
  name,
  province,
  position: { lat, lng },
  timeZone,
}));
