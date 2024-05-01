export interface WaktuProps {
  id: string;
  lokasi: string;
  date: string;
  daerah: string;
  jadwal: [
    waktu: {
      date: string;
      tanggal: string;
      imsak: string;
      subuh: string;
      terbit: string;
      dhuha: string;
      dzuhur: string;
      ashar: string;
      maghrib: string;
      isya: string;
    }
  ];
  tanggal: string;
  bulan: string;
  tahun: string;
}

export interface KotaProps {
  data: [
    {
      id: string;
      lokasi: string;
    }
  ];
}
