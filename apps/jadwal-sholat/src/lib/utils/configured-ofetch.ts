import { ofetch } from "ofetch";

function configuredOfetch(link: string) {
  return ofetch(link, {
    parseResponse: JSON.parse,
    responseType: "json",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export { configuredOfetch as ofetch };
