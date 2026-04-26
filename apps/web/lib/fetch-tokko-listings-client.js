export const TOKKO_LISTINGS_PAGE_SIZE = 24;

/**
 * Listado Tokko vía proxy Next (requiere API levantado y API_URL en .env).
 * @param {{ q: string; offset: number; operation?: "sale" | "rent" }} opts
 */
export async function fetchTokkoListingsClient({ q, offset, operation }) {
  const params = new URLSearchParams();
  params.set("limit", String(TOKKO_LISTINGS_PAGE_SIZE));
  params.set("offset", String(offset));
  if (q) params.set("q", q);
  if (operation === "sale" || operation === "rent") {
    params.set("operation", operation);
  }
  const res = await fetch(`/api/tokko/listings?${params.toString()}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (err.error === "missing_api_url") {
      throw new Error(
        err.message ||
          "Falta API_URL en .env y/o el API no está corriendo (npm run dev:api).",
      );
    }
    if (err.error === "proxy_upstream" && err.message) {
      throw new Error(err.message);
    }
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
}
