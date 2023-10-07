import { devtools } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { DateSliceProps, LastReadSliceProps, OptionSliceProps } from "~interfaces";

import dateSlice from "./slices/date-slice";
import lastReadSlice from "./slices/last-read-slice";
import optionSlice from "./slices/option-slice";

const useGlobalStore = createWithEqualityFn<
  LastReadSliceProps & DateSliceProps & OptionSliceProps
>()(
  devtools((...set) => ({
    ...lastReadSlice(...set),
    ...dateSlice(...set),
    ...optionSlice(...set),
  })),
  shallow
);

export default useGlobalStore;
