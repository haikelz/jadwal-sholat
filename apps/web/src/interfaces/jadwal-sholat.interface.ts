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

export interface UserLocationProps {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: AddressProps;
  boundingbox: string[];
}

export interface AddressProps {
  shop: string;
  house_number: string;
  road: string;
  village: string;
  subdistrict: string;
  city: string;
  state: string;
  "ISO3166-2-lvl4": string;
  region: string;
  "ISO3166-2-lvl3": string;
  postcode: string;
  country: string;
  country_code: string;
  county: string;
}

export interface AdzanSliceProps {
  isOpenConfirmModal: boolean;
  setIsOpenConfirmModal: (isOpenConfirmModal: boolean) => void;
  isPlayingAudioAdzan: boolean;
  setIsPlayingAudioAdzan: (isPlayingAudioAdzan: boolean) => void;
}
