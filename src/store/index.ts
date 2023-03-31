import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { DataProps, DateProps, LastReadProps, OptionProps } from "~models";
import createDateSlice from "./slices/dateSlice";
import createGetDataSlice from "./slices/getDataSlice";
import createLastReadSlice from "./slices/lastReadSlice";
import createOptionSlice from "./slices/optionSlice";

const useAppStore = create<LastReadProps & DateProps & OptionProps & DataProps>()(
  devtools((...set) => ({
    ...createLastReadSlice(...set),
    ...createDateSlice(...set),
    ...createOptionSlice(...set),
    ...createGetDataSlice(...set),
  }))
);

export default useAppStore;
