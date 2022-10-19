import { MutableRefObject, ReactNode } from "react";

export interface State {
  audio?: boolean;
  terjemahan?: boolean;
  tafsir?: boolean;
}

export interface Children {
  children: ReactNode[] | JSX.Element;
  title?: string;
}

export interface SearchBar {
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
    ];
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
}

export interface Notification {
  dispatchNotification: any;
}

export interface Context {
  params: {
    number?: string;
    id?: string;
  };
}

export interface KotaPaths {
  id: string;
}

export interface SuratPaths {
  number: number;
}

export interface DaftarSurah {
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
}

export interface PuasaSunnah {
  puasaSunnah: [
    fasting: {
      month: number;
      date: string;
      type: {
        name: string;
      };
    }
  ];
}

export interface HandleChange {
  target: {
    value: string;
  };
}

export interface Keydown {
  ref: MutableRefObject<string | any>;
  isShiftKey: boolean;
  key1: string;
  key2: string;
}

export interface KeydownEvent {
  shiftKey: boolean;
  key: string;
}
