import { format } from "date-fns";
import { id } from "date-fns/locale";

export const date: Date = new Date();
export const tahun: string = format(date, "yyyy");
export const bulan: string = format(date, "MM");
export const hari: string = format(date, "dd");
export const hours: string = format(date, "H");
export const currentDate: string = format(date, "dd MMMM yyyy", { locale: id });

/**
 * Karena waktunya masih berupa string, kita ubah ke number.
 * Biar kita bisa membandingkan dan mendapatkan jadwal hari ini
 */
export const numTahun: number = Number(tahun);
export const numBulan: number = Number(bulan);
export const numTanggal: number = Number(hari);
export const matchDate: string = format(date, "dd-MM-yyyy");

export const browser = typeof window !== "undefined";
export const condition = process.env.NODE_ENV;
