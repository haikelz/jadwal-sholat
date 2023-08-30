import { devtools } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { DateSliceProps, LastReadSliceProps, OptionSliceProps, ThemeSliceProps } from "~interfaces";

import dateSlice from "./slices/date-slice";
import lastReadSlice from "./slices/last-read-slice";
import optionSlice from "./slices/option-slice";
import themeSlice from "./slices/theme-slice";

const useGlobalStore = createWithEqualityFn<
  LastReadSliceProps & DateSliceProps & OptionSliceProps & ThemeSliceProps
>()(
  devtools((...set) => ({
    ...lastReadSlice(...set),
    ...dateSlice(...set),
    ...optionSlice(...set),
    ...themeSlice(...set),
  })),
  shallow
);

export default useGlobalStore;
