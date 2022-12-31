import { MutableRefObject, ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode[] | JSX.Element;
  title?: string;
};

export type KotaProps = {
  kota: [
    loc: {
      id: string;
      lokasi: string;
    }
  ];
};

export type WaktuProps = {
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
    ];
  };
  tanggal: string;
  bulan: string;
  tahun: string;
};

export type SuratProps = {
  surat: {
    number: number;
    name: string;
    translation: string;
    bismillah: {
      arab: string;
      translation: string;
      audio: {
        alafasy: string;
      };
    };
    asma: {
      translation: {
        id: string;
      };
      id: {
        short: string;
      };
    };
    tafsir: {
      id: string;
    };
    description: string;
    ayahs: [
      ayat: {
        number: {
          insurah: number;
        };
        text: {
          ar: string;
          read: string;
        };
        audio: {
          url: string;
        };
        translation: {
          id: string;
        };
      }
    ];
    type: {
      id: string;
    };
  };
  audio?: boolean;
  terjemahan?: boolean;
  tafsir?: boolean;
  dispatchTafsir?: any;
  dispatchNotification?: any;
};

export type NotificationProps = {
  dispatchNotification: any;
};

export type ContextProps = {
  params: {
    number?: string;
    id?: string;
  };
};

export type KotaPathsProps = {
  id: string;
};

export type SuratPathsProps = {
  number: number;
};

export type DaftarSurahProps = {
  surat: [
    surat: {
      number: string;
      asma: {
        id: {
          short: string;
        };
        translation: {
          id: string;
        };
      };
      ayahCount: string;
      type: {
        id: string;
      };
    }
  ];
};

export type PuasaSunnahProps = {
  puasaSunnah: [
    fasting: {
      month: number;
      date: string;
      type: {
        name: string;
      };
    }
  ];
};

export type LazyLoadImageProps = {
  className?: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type KeydownProps = {
  ref: MutableRefObject<string | any>;
  isShiftKey: boolean;
  key1: string;
  key2: string;
};

export type KeydownEventProps = {
  shiftKey: boolean;
  key: string;
};

export type SearchBarProps = {
  setSearchTerm: (value: string) => void;
};

export type HandleChangeProps = {
  target: {
    value: string;
  };
};

export type PreviousOrNextButtonProps = SuratProps & {};
