import { ofetch } from "ofetch";

function configuredOfetch(link: string) {
  return ofetch(link, { parseResponse: JSON.parse, responseType: "json" });
}

export { configuredOfetch as ofetch };
