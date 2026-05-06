/**
 * Listado Tokko vía API Fastify (solo servidor; usa API_URL del monorepo).
 * @param {{ limit?: number; offset?: number; operation?: "sale" | "rent" }} [opts]
 * @returns {Promise<{ items: Record<string, unknown>[]; total?: number; source?: string } | null>}
 */
export async function fetchTokkoHomeListings(opts = {}) {
  const base = process.env.API_URL?.replace(/\/$/, "");
  if (!base) return null;
  const limit = Math.min(Math.max(Number(opts.limit) || 12, 1), 50);
  const offset = Math.max(Number(opts.offset) || 0, 0);
  const params = new URLSearchParams();
  params.set("limit", String(limit));
  params.set("offset", String(offset));
  if (opts.operation === "sale" || opts.operation === "rent") {
    params.set("operation", opts.operation);
  }
  try {
    const res = await fetch(`${base}/tokko/listings?${params}`, {
      next: { revalidate: 120 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
