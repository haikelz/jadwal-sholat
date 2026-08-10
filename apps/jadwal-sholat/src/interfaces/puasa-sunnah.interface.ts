export interface PuasaSunnahTypesSliceProps {
  selectedMonth: string;
  setSelectedMonth: ({ selectedMonth }: { selectedMonth: string }) => void;
  selectedType: PuasaSunnahTypeKey | "all";
  setSelectedType: ({
    selectedType,
  }: {
    selectedType: PuasaSunnahTypeKey | "all";
  }) => void;
}

export type PuasaSunnahTypeKey =
  | "monday_thursday"
  | "white_days"
  | "six_shawwal_candidate"
  | "ashura"
  | "first_nine_dhul_hijjah"
  | "arafah";

export interface PuasaSunnahRecommendation {
  key: PuasaSunnahTypeKey;
  name: string;
  evidence: string;
}

export interface PuasaSunnahScheduleDate {
  date: string;
  weekday: string;
  hijri: {
    year: number;
    month: number;
    day: number;
  };
  recommendations: PuasaSunnahRecommendation[];
  notes: string[];
}

export interface PuasaSunnahScheduleResponse {
  data: {
    period: "month";
    anchor_date: string;
    start_date: string;
    end_date: string;
    timezone: string;
    total: number;
    dates: PuasaSunnahScheduleDate[];
    disclaimer: string;
  };
}
