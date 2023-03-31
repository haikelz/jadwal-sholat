import { ofetch } from "ofetch";
import { StateCreator } from "zustand";
import { DataProps } from "~models";

const createGetDataSlice: StateCreator<DataProps, [], [], DataProps> = () => ({
  getData: async (link: string) => {
    const response = await ofetch(link, { parseResponse: JSON.parse });
    return response;
  },
});

export default createGetDataSlice;
