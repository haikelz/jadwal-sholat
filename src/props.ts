import { ReactNode, PropsWithChildren } from "react";

export type Judul = PropsWithChildren<{
    child?: ReactNode[] | JSX.Element;
}>

export interface Children {
    children: ReactNode[] | JSX.Element;
    title?: string;
}

export interface SearchFilter {
    setSearchTerm: (value: string) => void;
}

export interface Kota {
    kota: [
        loc: {
            id: string;
            lokasi: string;
        }
    ];
}

export interface Waktu {
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

export interface Surat {
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

export interface Context {
    params: {
        number?: string;
        id?: string;
    }
}

export interface KotaPaths {
    id: string;
}

export interface SuratPaths {
    number: number;
}

export interface DaftarSurah {
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

export interface Puasa {
    puasa: [
        fasting: {
            month: number;
            date: string;
            type: {
                name: string;
            }
        }
    ]
}
