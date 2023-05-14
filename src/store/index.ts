import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  DateSliceProps,
  LastReadSliceProps,
  OptionSliceProps,
  SelectedSuratProps,
  ThemeSliceProps,
} from "~models";
import dateSlice from "./slices/dateSlice";
import lastReadSlice from "./slices/lastReadSlice";
import optionSlice from "./slices/optionSlice";
import selectedSuratSlice from "./slices/selectedSuratSlice";
import themeSlice from "./slices/themeSlice";

const useAppStore = create<
  LastReadSliceProps & DateSliceProps & OptionSliceProps & ThemeSliceProps & SelectedSuratProps
>()(
  devtools((...set) => ({
    ...lastReadSlice(...set),
    ...dateSlice(...set),
    ...optionSlice(...set),
    ...themeSlice(...set),
    ...selectedSuratSlice(...set),
  }))
);

export default useAppStore;
