export interface JadwalSholatProps {
  timings: TimingsProps;
  date: DateProps;
}

export interface TimingsProps {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
}

export interface DateProps {
  readable: string;
  timestamp: string;
  gregorian: GregorianProps;
  hijri: HijriProps;
}

export interface GregorianProps {
  date: string;
  format: string;
  day: string;
  weekday: WeekdayProps;
  month: MonthProps;
  year: string;
  designation: DesignationProps;
}

export interface WeekdayProps {
  en: string;
}

export interface MonthProps {
  number: number;
  en: string;
}

export interface DesignationProps {
  abbreviated: string;
  expanded: string;
}

export interface HijriProps {
  date: string;
  format: string;
  day: string;
  weekday: Weekday2Props;
  month: Month2Props;
  year: string;
  designation: Designation2Props;
  holidays: string[];
}

export interface Weekday2Props {
  en: string;
  ar: string;
}

export interface Month2Props {
  number: number;
  en: string;
  ar: string;
}

export interface Designation2Props {
  abbreviated: string;
  expanded: string;
}
