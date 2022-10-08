let date: Date = new Date();
let hours: number = date.getHours();

let tahun: string = date.toLocaleDateString("en-CA", {
  year: "numeric",
});

let bulan: string = date.toLocaleDateString("en-CA", {
  month: "numeric",
});

let tanggal: string = date.toLocaleDateString("en-CA", {
  day: "numeric",
});

let currentDate: string = date.toLocaleDateString("id-ID", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

/**
 * Karena datenya masih berupa string, kita ubah ke number
 * biar kita bisa membandingkan dan mendapatkan jadwal hari ini
 **/

let numTahun: number = Number(tahun);
let numBulan: number = Number(bulan);
let numTanggal: number = Number(tanggal);

let matchDate: string = `${numTahun}-${numBulan < 10 ? 0 + `${numBulan}` : numBulan}-${
  numTanggal < 10 ? 0 + `${numTanggal}` : numTanggal
}`;

export {
  date,
  hours,
  currentDate,
  matchDate,
  numBulan,
  numTahun,
  numTanggal,
  bulan,
  tahun,
  tanggal,
};
