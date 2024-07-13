import { devtools } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import {
  AdzanSliceProps,
  DateSliceProps,
  IsOpenMapProps,
  LastReadSliceProps,
  LocationPositionProps,
  OptionSliceProps,
  PlayNextAudioSliceProps,
  ScrollSliceProps,
  WidthSliceProps,
  numberModalAsmaulHusnaSliceProps,
} from "~interfaces";

import adzanSlice from "./slices/adzan.slice";
import dateSlice from "./slices/date.slice";
import isOpenMapSlice from "./slices/is-open-map.slice";
import lastReadSlice from "./slices/last-read.slice";
import locationPositionSlice from "./slices/location-position.slice";
import numberModalAsmaulHusnaSlice from "./slices/number-modal-asmaul-husna.slice";
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
    ScrollSliceProps &
    numberModalAsmaulHusnaSliceProps &
    LocationPositionProps &
    IsOpenMapProps &
    AdzanSliceProps
>()(
  devtools((...set) => ({
    ...lastReadSlice(...set),
    ...dateSlice(...set),
    ...optionSlice(...set),
    ...widthSlice(...set),
    ...playNextAudioSlice(...set),
    ...scrollSlice(...set),
    ...numberModalAsmaulHusnaSlice(...set),
    ...locationPositionSlice(...set),
    ...isOpenMapSlice(...set),
    ...adzanSlice(...set),
  })),
  shallow
);

export default useGlobalStore;
