export const Waktu = () => {
    let date = new Date();

    let tahun = date.toLocaleDateString("fr-ca", {
        year: "numeric",
    });

    let bulan = date.toLocaleDateString("fr-ca", {
        month: "numeric",
    });

    let tanggal = date.toLocaleDateString("fr-ca", {
        day: "numeric",
    })
}