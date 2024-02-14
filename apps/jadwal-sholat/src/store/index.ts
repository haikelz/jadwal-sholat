import { devtools } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import {
  DateSliceProps,
  LastReadSliceProps,
  OptionSliceProps,
  PlayNextAudioSliceProps,
  ScrollSliceProps,
  WidthSliceProps,
} from "~interfaces";

import dateSlice from "./slices/date.slice";
import lastReadSlice from "./slices/last-read.slice";
import optionSlice from "./slices/option.slice";
import playNextAudioSlice from "./slices/play-next-audio.slice";
import scrollSlice from "./slices/scroll.slice";
import widthSlice from "./slices/width.slice";

const useGlobalStore = createWithEqualityFn<
  LastReadSliceProps &
    DateSliceProps &
    OptionSliceProps &
    WidthSliceProps &
    PlayNextAudioSliceProps &
    ScrollSliceProps
>()(
  devtools((...set) => ({
    ...lastReadSlice(...set),
    ...dateSlice(...set),
    ...optionSlice(...set),
    ...widthSlice(...set),
    ...playNextAudioSlice(...set),
    ...scrollSlice(...set),
  })),
  shallow
);

export default useGlobalStore;
