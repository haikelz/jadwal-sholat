import Axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const axios = Axios.create(config);

export async function getData<T>(url: string): Promise<T> {
  try {
    const response = await axios.get(url, {
      method: "GET",
    });

    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch data!");
  }
}
