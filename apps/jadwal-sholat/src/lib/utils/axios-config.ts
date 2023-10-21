import Axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const axios = Axios.create(config);

export async function getData<T>(url: string): Promise<T> {
  const response = await axios.get(url, {
    method: "GET",
  });

  return response.data;
}
