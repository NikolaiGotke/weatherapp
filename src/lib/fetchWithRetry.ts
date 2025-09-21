export async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`OpenMeteo fetch failed: ${res.status} ${res.statusText}`);
    return (await res.json()) as T;
  } catch (err) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
    throw err;
  }
}
