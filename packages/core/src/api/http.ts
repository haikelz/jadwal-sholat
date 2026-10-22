import type { ZodType } from "zod";

export class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly url: string,
  ) {
    super(`Request failed (${status}) ${url}`);
    this.name = "HttpError";
  }
}

export type RequestOptions = {
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

/** GET JSON and validate it; the response stays `unknown` until it parses. */
export async function getJson<T>(
  url: string,
  schema: ZodType<T>,
  { headers, signal }: RequestOptions = {},
): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: "application/json", ...headers },
    signal,
  });
  if (!response.ok) throw new HttpError(response.status, url);

  const body: unknown = await response.json();
  return schema.parse(body);
}
