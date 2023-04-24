import { ofetch } from "ofetch";
import { StateCreator } from "zustand";
import { GetDataSliceProps } from "~models";

const getDataSlice: StateCreator<GetDataSliceProps, [], [], GetDataSliceProps> = () => ({
  getData: async (link: string) => {
    const response = await ofetch(link, { parseResponse: JSON.parse });
    return response;
  },
});

export default getDataSlice;
