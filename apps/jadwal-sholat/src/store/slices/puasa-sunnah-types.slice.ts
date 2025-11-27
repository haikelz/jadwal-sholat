import { PuasaSunnahTypesSliceProps } from "@/interfaces";
import { StateCreator } from "zustand";

const puasaSunnahTypesSlice: StateCreator<
  PuasaSunnahTypesSliceProps,
  [],
  [],
  PuasaSunnahTypesSliceProps
> = (set) => ({
  typeId: 9,
  setType: ({ typeId }: { typeId?: number }) =>
    set({
      typeId,
    }),
});

export default puasaSunnahTypesSlice;
