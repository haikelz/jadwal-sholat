export interface AsmaulHusnaProps {
  urutan: string;
  latin: string;
  arab: string;
  arti: string;
}

export interface numberModalAsmaulHusnaSliceProps {
  numberModalAsmaulHusna: number;
  setNumberModalAsmaulHusna: (numberModalAsmaulHusna: number) => void;
  dataAsmaulHusna: AsmaulHusnaProps;
  setDataAsmaulHusna: (dataAsmaulHusna: AsmaulHusnaProps) => void;
}
