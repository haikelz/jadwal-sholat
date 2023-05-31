import { format } from "date-fns";
import id from "date-fns/locale/id";

export const date: Date = new Date();
export const tahun: string = format(date, "yyyy");
export const bulan: string = format(date, "MM");
export const hari: string = format(date, "dd");
export const hours: number = date.getHours();
export const currentDate: string = format(date, "dd MMMM yyyy", { locale: id });

/**
 * Karena waktunya masih berupa string, kita ubah ke number.
 * Biar kita bisa membandingkan dan mendapatkan jadwal hari ini
 */
export const numTahun: number = Number(tahun);
export const numBulan: number = Number(bulan);
export const numTanggal: number = Number(hari);
export const matchDate: string = format(date, "yyyy-MM-dd");

// API
export const QURAN_API = "https://quran-endpoint.vercel.app";
export const PUASA_SUNNAH_API = "https://api.puasa-sunnah.granitebps.com/api/v1/fastings";
export const JADWAL_SHOLAT_API = "https://api.myquran.com/v1/sholat";

// Switch Theme
export const browser = typeof window !== "undefined";
