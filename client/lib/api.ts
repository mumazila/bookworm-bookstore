const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

/**
 * GET helper for the Express API.
 * Returns null on 404 so pages can call notFound().
 */
export async function apiGet<T>(path: string): Promise<T | null> {
  const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store" });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API error ${res.status} on GET ${path}`);

  return res.json() as Promise<T>;
}
