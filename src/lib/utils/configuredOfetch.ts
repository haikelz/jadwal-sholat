import { ofetch } from "ofetch";

export function configuredOfetch(link: string) {
  return ofetch(link, { parseResponse: JSON.parse, responseType: "json" });
}
