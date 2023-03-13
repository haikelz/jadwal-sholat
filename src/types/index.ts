import { ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode[] | JSX.Element;
  title?: string;
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
