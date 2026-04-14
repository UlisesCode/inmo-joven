/**
 * Obtiene listados públicos desde el API Fastify (solo en servidor).
 * @param {{ limit?: number }} [opts]
 * @returns {Promise<{ items: Record<string, unknown>[]; total?: number } | null>}
 */
export async function fetchPublicProperties(opts = {}) {
  const base = process.env.API_URL?.replace(/\/$/, "");
  if (!base) return null;
  const limit = opts.limit ?? 12;
  try {
    const res = await fetch(`${base}/properties?limit=${limit}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
