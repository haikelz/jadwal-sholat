import Axios, { AxiosError } from "axios";

const axios = Axios.create({
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export async function getData(url: string): Promise<any> {
  try {
    const response = await axios.get(url, {
      method: "GET",
    });

    return response.data;
  } catch (err) {
    console.error(err as AxiosError);
  }
}
