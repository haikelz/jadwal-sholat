import { ReactNode, PropsWithChildren } from "react";

export interface childrenProps {
    children: ReactNode[] | JSX.Element;
    title?: string;
}

export interface kotaProps {
    kota: [id: string, lokasi: string];
}

export interface waktuProps {
    waktu: {
        id: string;
        lokasi: string;
        date: string;
        daerah: string;
        jadwal: any;
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
        description: string;
    };

    audio?: boolean;
    terjemahan?: boolean;
    tafsir?: boolean;
    tafsirClick?: any;
}

export interface listSurahProps {
    surah: {
        number: string;
        translation: {
            id: string;
        };
    };
}

export type judulProps = PropsWithChildren<{
    child?: ReactNode[] | JSX.Element;
}>

export interface IKegiatan {
    namaKegiatan: string;
    deadline: string;
}
