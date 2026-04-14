const FALLBACK_IMAGE = "/images/section/box-house.jpg";

/**
 * @param {unknown} images
 * @returns {string}
 */
export function pickPrimaryImage(images) {
  if (images == null) return FALLBACK_IMAGE;
  if (typeof images === "string" && images.trim()) return images.trim();
  if (Array.isArray(images)) {
    if (images.length === 0) return FALLBACK_IMAGE;
    return pickPrimaryImage(images[0]);
  }
  if (typeof images === "object") {
    const o = /** @type {Record<string, unknown>} */ (images);
    if (typeof o.url === "string") return o.url;
    if (typeof o.src === "string") return o.src;
    if (typeof o.image === "string") return o.image;
    if (typeof o.thumb === "string") return o.thumb;
    const nested = o.urls ?? o.images ?? o.data;
    if (nested != null && nested !== images) return pickPrimaryImage(nested);
  }
  return FALLBACK_IMAGE;
}

/**
 * @param {{ address?: string | null; city?: string | null; region?: string | null }} p
 */
export function formatLocationLine(p) {
  const parts = [p.address, p.city, p.region].filter(
    (x) => typeof x === "string" && x.trim(),
  );
  return parts.length ? parts.join(", ") : p.city?.trim() || "—";
}

/**
 * @param {import("@prisma/client").Property} row
 */
export function propertyToListingDto(row) {
  const price = row.price != null ? Number(row.price) : 0;
  const areaSqm = row.areaSqm != null ? Number(row.areaSqm) : null;
  return {
    id: row.id,
    title: row.title?.trim() || "Sin título",
    location: formatLocationLine(row),
    beds: row.bedrooms ?? 0,
    baths: row.bathrooms ?? 0,
    sqft: areaSqm != null ? `${Math.round(areaSqm)} m²` : "—",
    price,
    currency: row.currency || "USD",
    imageSrc: pickPrimaryImage(row.images),
    operation: row.operation,
    lat: row.lat,
    lng: row.lng,
  };
}
