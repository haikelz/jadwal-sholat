let date = new Date();

let tahun = date.toLocaleDateString("en-CA", {
    year: "numeric",
});

let bulan = date.toLocaleDateString("en-CA", {
    month: "numeric",
});

let tanggal = date.toLocaleDateString("en-CA", {
    day: "numeric",
});

let currentDate = date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
})

/* 
  Karena datenya masih berupa string, kita ubah ke number 
  biar kita bisa membandingkan dan mendapatkan jadwal hari ini
*/
let numTahun = Number(tahun);
let numBulan = Number(bulan);
let numTanggal = Number(tanggal);

let matchDate = `${numTahun}-${numBulan < 10 ? 0 + `${numBulan}` : numBulan
    }-${numTanggal < 10 ? 0 + `${numTanggal}` : numTanggal}`;

export { currentDate, matchDate, numBulan, numTahun, numTanggal, bulan, tahun, tanggal };