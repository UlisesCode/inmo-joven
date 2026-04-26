/**
 * Detalle de publicación Tokko (solo servidor; usa API_URL del monorepo).
 * @param {string} id
 * @returns {Promise<Record<string, unknown> | null>}
 */
export async function fetchTokkoPublication(id) {
  const base = process.env.API_URL?.replace(/\/$/, "");
  if (!base || !id?.trim()) return null;
  try {
    const res = await fetch(
      `${base}/tokko/publications/${encodeURIComponent(id.trim())}`,
      { next: { revalidate: 120 } },
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
