// The puasa API's shapes and the fast types, from packages/core (shared with
// the Android app).
import type { PuasaTypeFilter } from "@jadwal-sholat/core/puasa";
import type { PuasaDate, PuasaSchedule } from "@jadwal-sholat/core/schemas";

export interface PuasaSunnahTypesSliceProps {
  selectedMonth: string | null;
  setSelectedMonth: ({ selectedMonth }: { selectedMonth: string }) => void;
  selectedType: PuasaTypeFilter;
  setSelectedType: ({ selectedType }: { selectedType: PuasaTypeFilter }) => void;
}

export type PuasaSunnahScheduleDate = PuasaDate;
export type PuasaSunnahScheduleResponse = { data: PuasaSchedule };
