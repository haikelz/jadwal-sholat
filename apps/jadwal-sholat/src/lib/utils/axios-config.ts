import Axios, { AxiosError } from "axios";

const axios = Axios.create({
  responseType: "json",
});

export async function getData(url: string): Promise<any> {
  try {
    const response = await axios.get(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (err) {
    console.error(err as AxiosError);
  }
}
