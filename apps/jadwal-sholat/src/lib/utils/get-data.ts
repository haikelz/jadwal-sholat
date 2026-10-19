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

  if (!response.ok) {
    throw new Error(`Failed to fetch data! (${response.status} ${url})`);
  }

  return (await response.json()) as T;
}
