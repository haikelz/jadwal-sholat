import { devtools } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import {
  DateSliceProps,
  IsAscendingSliceProps,
  LastReadSliceProps,
  OptionSliceProps,
  PlayNextAudioSliceProps,
  WidthSliceProps,
} from "~interfaces";

import dateSlice from "./slices/date-slice";
import isAscendingSlice from "./slices/is-ascending-slice";
import lastReadSlice from "./slices/last-read-slice";
import optionSlice from "./slices/option-slice";
import playNextAudioSlice from "./slices/play-next-audio-slice";
import widthSlice from "./slices/width-slice";

const useGlobalStore = createWithEqualityFn<
  LastReadSliceProps &
    DateSliceProps &
    OptionSliceProps &
    WidthSliceProps &
    IsAscendingSliceProps &
    PlayNextAudioSliceProps
>()(
  devtools((...set) => ({
    ...lastReadSlice(...set),
    ...dateSlice(...set),
    ...optionSlice(...set),
    ...widthSlice(...set),
    ...isAscendingSlice(...set),
    ...playNextAudioSlice(...set),
  })),
  shallow
);

export default useGlobalStore;
