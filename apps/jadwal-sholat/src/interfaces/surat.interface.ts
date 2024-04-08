export interface PlayNextAudioSliceProps {
  isPlayAudio: boolean;
  setIsPlayAudio: (isPlayAudio: boolean) => void;
  isAudioEnded: boolean;
  setIsAudioEnded: (isAudioEnded: boolean) => void;
  ayat: string;
  setAyat: (ayat: string) => void;
}

export interface OptionSliceProps {
  audio: boolean;
  tafsir: boolean;
  terjemahan: boolean;
  notification: boolean;
  isMore: boolean;
  qori: number;
  setNotification: (status: boolean) => void;
  setAudio: (status: boolean) => void;
  setTerjemahan: (status: boolean) => void;
  setTafsir: (status: boolean) => void;
  setQori: (id: number) => void;
}

export interface PlayNextAudioSliceProps {
  isPlayAudio: boolean;
  setIsPlayAudio: (isPlayAudio: boolean) => void;
  isAudioEnded: boolean;
  setIsAudioEnded: (isAudioEnded: boolean) => void;
  ayat: string;
  setAyat: (ayat: string) => void;
}

export interface LastReadProps {
  id: string;
  name: string;
  ayat: number | null;
  number: number | null;
}

export interface LastReadSliceProps {
  lastRead: LastReadProps;
  setLastRead: (lastRead: LastReadProps) => void;
}

export interface ListSuratProps {
  data: {
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
  }[];
}

export interface SuratProps {
  data: {
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
}
