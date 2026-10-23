/** A non-2xx response; pages turn a 404 into Next's notFound(). */
export class FetchError extends Error {
  constructor(
    readonly status: number,
    url: string,
  ) {
    super(`Failed to fetch data! (${status} ${url})`);
    this.name = "FetchError";
  }
}

/**
 * GET a JSON endpoint with the platform `fetch`.
 *
 * Native fetch keeps axios out of the browser bundle, and on the server Next
 * memoizes identical GETs within one render, so generateMetadata and the page
 * share a single request.
 */
export async function getData<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { Accept: "application/json", ...init?.headers },
  });

  if (!response.ok) throw new FetchError(response.status, url);

  return (await response.json()) as T;
}
