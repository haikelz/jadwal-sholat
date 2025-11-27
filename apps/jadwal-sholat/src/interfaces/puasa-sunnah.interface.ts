export interface PuasaSunnahTypesSliceProps {
  selectedMonth?: string;
  setSelectedMonth: ({ selectedMonth }: { selectedMonth?: string }) => void;
  typeId?: number;
  setType: ({ typeId }: { typeId?: number }) => void;
}
