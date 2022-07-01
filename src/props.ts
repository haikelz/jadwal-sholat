import { ReactNode, PropsWithChildren } from "react";

export interface childrenProps {
    children: ReactNode[] | JSX.Element;
    title?: string;
}

export interface kotaProps {
    kota: [
        loc: {
            id: string; 
            lokasi: string; 
        } 
    ];
}

export interface waktuProps {
    waktu: {
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
        ]
    }; 

    tanggal: string;
    bulan: string;
    tahun: string;
}

export interface suratProps {
    surat: {
        number: number;
        name: string;
        translation: string;
        bismillah: {
            arab: string;
            translation: string;
            audio: {
                alafasy: string;
            }
        }
        asma: {
            translation: {
                id: string;
            }
            id: {
                short: string;
            }
        }
        description: string;
        tafsir: {
            id: string;
        }
        ayahs: [
            ayat: {
                number: {
                    insurah: number; 
                }

                text: {
                    ar: string;
                    read: string; 
                }

                audio: {
                    url: string; 
                }

                translation: {
                    id: string; 
                }
            }
        ]
    };

    audio?: boolean;
    terjemahan?: boolean;
    tafsir?: boolean;
    tafsirClick?: any;
}

export interface listSurahProps {
    surah: [
        surat: {
            number: string;
            asma: {
                id: {
                    short: string; 
                }

                translation: {
                    id: string; 
                }
            }

            ayahCount: string; 
        }
    ]
}

export type judulProps = PropsWithChildren<{
    child?: ReactNode[] | JSX.Element;
}>

export interface IKegiatan {
    namaKegiatan: string;
    deadline: string;
} 
