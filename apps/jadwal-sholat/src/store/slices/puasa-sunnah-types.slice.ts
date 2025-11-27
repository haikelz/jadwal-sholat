import { PuasaSunnahTypesSliceProps } from "@/interfaces";
import { StateCreator } from "zustand";

const puasaSunnahTypesSlice: StateCreator<
  PuasaSunnahTypesSliceProps,
  [],
  [],
  PuasaSunnahTypesSliceProps
> = (set) => ({
  date: new Date(),
  typeId: 9,
  setDate: ({ date }: { date?: Date }) => set({ date }),
  setType: ({ typeId }: { typeId?: number }) =>
    set({
      typeId,
    }),
});

export default puasaSunnahTypesSlice;
