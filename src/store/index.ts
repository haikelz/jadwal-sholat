import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { DateSliceProps, LastReadSliceProps, OptionSliceProps, ThemeSliceProps } from "~models";
import dateSlice from "./slices/dateSlice";
import lastReadSlice from "./slices/lastReadSlice";
import optionSlice from "./slices/optionSlice";
import themeSlice from "./slices/themeSlice";

const useAppStore = create<
  LastReadSliceProps & DateSliceProps & OptionSliceProps & ThemeSliceProps
>()(
  devtools((...set) => ({
    ...lastReadSlice(...set),
    ...dateSlice(...set),
    ...optionSlice(...set),
    ...themeSlice(...set),
  }))
);

export default useAppStore;
